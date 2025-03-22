declare type KnownLightVariants = "On Off Light" | "Dimmable Light" | "Color Light" | "Color Temperature Light" | "Extended Color Light";

declare class SuperSimpleLightState {
    on?: boolean;
    saturation?: number;
    brightness?: number;
    hue?: number;
    ct?: number;
}

declare class SuperSimpleLight {
    id?: string;
    name?: string;
    state?: SuperSimpleLightState;
}

declare class SimpleLightsApi {
    public getAll(): Promise<Array<SimpleLight>>;
    public getLight(id: number): Promise<SimpleLight>;
    public getLightByName(name: string): Promise<Array<SimpleLight>>;
    public searchForNew(): Promise<boolean>;
    public getNew(): Promise<{lastscan: string} | {[id: string]: {name: string}}>
    public getLightState(): Promise<SimpleLightState>;
    public setLightState(id: string, state: SimpleLightState): Promise<boolean>;
}

declare class SimpleGroupsApi {
    public getAll(): Promise<Array<SimpleLightGroup>>;
    public getGroup(id: number): Promise<SimpleLightGroup>;
    public getGroupByName(name: string): Promise<Array<SimpleLightGroup>>;
    public getLightGroups(): Promise<Array<SimpleLightGroup>>;
    public getRooms(): Promise<Array<SimpleLightGroup>>;
    public getZones(): Promise<Array<SimpleLightGroup>>;
    public searchForNew(): Promise<boolean>;
    public getNew(): Promise<{lastscan: string} | {[id: string]: {name: string}}>
    public getGroupState(): Promise<SimpleLightState>;
    public setGroupState(id: string, state: SimpleLightState): Promise<boolean>;
}

declare class SimpleScenesApi {
    public getAll(): Promise<Array<SimpleScene>>;
}

declare class SimpleScene {
    public get id(): string;
    public get name(): string;
    public set name(value: string);
    public get type(): "GroupScene" | "LightScene";
    public toStringDetailed(): string;
}

declare class SimpleLight {
    public get id(): string;
    public get name(): string;
    public set name(name: string);
    public get type(): KnownLightVariants | string;
    public get uniqueid(): string;
    public get state(): SimpleLightState;
    public toStringDetailed(): string;
}

declare class SimpleLightState {
    public reset(): SimpleLightState;
    public populate(data: SimpleLightState): SimpleLightState;
    public on(enable: boolean): SimpleLightState;
    public off(): SimpleLightState;
    /**
     * Sets the brightness
     * @param brightness Must be between 1-254
     */
    public bri(brightness: number): SimpleLightState;
    /**
     * Sets the brightness
     * @param brightness Must be between 0-100 (Represents percentage)
     */
    public brightness(brightness: number): SimpleLightState;
    /**
     * 
     * @param hue Must be between 0-65535, with 0 and 65535 both being red, 25500 is green and 46920 is blue
     */
    public hue(hue: number): SimpleLightState;
    /**
     * Sets saturation
     * @param saturation Must be between 0 and 254, with 0 as least saturated (white) and 254 as most saturated (colored)
     */
    public sat(saturation: number): SimpleLightState;
    /**
     * Sets saturation
     * @param saturation Must be between 0 and 100 (Represents percentage), with 0 as least saturated (white) and 100 as most saturated (colored)
     */
    public saturation(saturation: number): SimpleLightState;
    /**
     * Sets Mired color temp
     * @param value Mired color temperature, between 153 (6500K) and 500 (2000K)
     */
    public ct(value: number): SimpleLightState;
    public effect(value: "colorloop" | "none"): SimpleLightState;
    public effectColorLoop(): SimpleLightState;
    public effectNone(): SimpleLightState;
    public transition(timeInMs: number): SimpleLightState;
    /**
     * Set state to white. Can only be used on LightState.
     * @param temp Mired color temp, can be between 153 (6500K) and 500 (2000K)
     * @param brightness Brightness expressed as percentage from 0 to 100
     */
    public white(temp: number, brightness: number): SimpleLightState;
    /**
     * Can only be used on LightState.
     * @param hue is the hue value expressed as a degree value between 0 and 360
     * @param saturation is the saturation expressed as a percentage from 0 to 100
     * @param brightness is the brightness expressed as a percentage from 0 to 100
     */
    public hsb(hue: number, saturation: number, brightness: number): SimpleLightState;
    /**
     * Can only be used on LightState.
     * @param hue is the hue value expressed as a degree value between 0 and 360
     * @param saturation is the saturation expressed as a percentage from 0 to 100
     * @param luminosity is the luminosity value between 0 and 100
     */
    public hsl(hue: number, saturation: number, luminosity: number): SimpleLightState;
    /**
     * Set rgb value. Can only be used on LightState.
     * @param red Red value
     * @param green Green value
     * @param blue Blue value
     */
    public rgb(red: number, green: number, blue: number): SimpleLightState;
    /**
     * Can only be used on GroupLightState.
     * @param name Name of id of scene to trigger for group
     */
    public scene(name: string): SimpleLightState;
}

declare type GroupType = "Lunimarie" | "Lighsource" | "LightGroup" | "Room" | "Entertainment" | "Zone";

declare class SuperSimpleLightGroup {
    id?: string;
    name?: string;
    lights?: Array<string>;
    type?: GroupType;
}

declare class SimpleLightGroup {
    public get id(): string;
    public get name(): string;
    public set name(value: string);
    public get lights(): Array<string>;
    public get type(): GroupType;
    public toStringDetailed(): string;
}

declare class SimpleRoom extends SimpleLightGroup {
    public get type(): "Room";
    public get class(): string;
}

declare class SimpleZone {
    public get type(): "Zone";
    public get class(): string;
}