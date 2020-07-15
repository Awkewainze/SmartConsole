import Api from "node-hue-api/lib/api/Api";
import { Subject, Observable } from "rxjs";
import LightState from "node-hue-api/lib/model/lightstate/LightState";

export enum DefaultColor {
	Red = 65280,
	Pink = 56100,
	Purple = 52180,
	Violet = 47188,
	Blue = 46920,
	Turquoise = 31146,
	Green = 25500,
	Yellow = 12750,
	Orange = 8618
}

export enum WhiteTemperature {
	Candle = 500,
	Relaxing = 467,
	Reading = 346,
	Neutral = 300,
	Concentrate = 231,
	Energize = 136
}

function lightToString(light: SimpleLight): string {
	return light.id + ":" + light.name + ":" + light.state.on + ":" + light.state.hue + ":" + light.state.brightness + ":" + light.state.saturation + ":" + light.state.ct;
}

function groupToString(group: SimpleLightGroup): string {
	return group.id + ":" + group.name + ":" + group.lights.length;
}

export class LightManager {
    private readonly api: Api;
	private lights: Promise<Array<SimpleLight>> = Promise.resolve([]);
	private groups: Promise<Array<SimpleLightGroup>> = Promise.resolve([]);
	private readonly lightOrGroupChanged: Subject<{lights: Array<SimpleLight>, groups: Array<SimpleLightGroup>}> =
		new Subject<{lights: Array<SimpleLight>, groups: Array<SimpleLightGroup>}>();
    constructor(api: Api) {
		this.api = api;
		setInterval(this.checkForUpdates.bind(this), 3000);
		this.checkForUpdates();
	}

	public async checkForUpdates(): Promise<void> {
		const lightsApi = this.api.lights as any as SimpleLightsApi;
		const groupsApi = this.api.groups as any as SimpleGroupsApi;
		const oldLights = this.lights;
		const oldGroups = this.groups;
		this.lights = lightsApi.getAll();
		this.groups = groupsApi.getAll();
		if((await this.lights).map(x => lightToString(x)).join("--") !== (await oldLights).map(x => lightToString(x)).join("--")
			|| (await this.groups).map(x => groupToString(x)).join("--") !== (await oldGroups).map(x => groupToString(x)).join("--")) {
			this.lightOrGroupChanged.next({lights: await this.lights, groups: await this.groups});
		}
	}

	public getLights(): Promise<Array<SimpleLight>> {
		return this.lights;
	}

	public getGroups(): Promise<Array<SimpleLightGroup>> {
		return this.groups;
	}

	public async setLightState(lightId: string, lightState: SimpleLightState): Promise<void> {
		await this.api.lights.setLightState(lightId, lightState);
		await this.checkForUpdates();
	}

	public async setGroupState(groupId: string, groupState: SimpleLightState): Promise<void> {
		await this.api.groups.setGroupState(groupId, groupState);
		await this.checkForUpdates();
	}

	public getLightOrGroupChangedObservable(): Observable<{lights: Array<SimpleLight>, groups: Array<SimpleLightGroup>}> {
		return this.lightOrGroupChanged.asObservable();
	}
}