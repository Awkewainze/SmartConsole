import * as io from "socket.io-client";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";

export class CommunicationService {
    private readonly onRefresh = new Subject<void>();
    private readonly onLightOrGroupChanged = new Subject<{lights: Array<SuperSimpleLight>, groups: Array<SuperSimpleLightGroup>}>();
    private readonly onLights = new Subject<Array<SuperSimpleLight>>();
    private readonly onGroups = new Subject<Array<SuperSimpleLightGroup>>();
    private readonly socket: SocketIOClient.Socket;
    private constructor() {
        this.socket = io.connect("http://Dylan-Desktop:3000/", {});
        this.socket.on("Refresh", () => this.onRefresh.next());
        this.socket.on("LightOrGroupChanged", (...data: any[]) => this.onLightOrGroupChanged.next(...data));
        this.socket.on("Lights", (...data: any[]) => this.onLights.next(...data));
        this.socket.on("Groups", (...data: any[]) => this.onGroups.next(...data));
    }

    private static instance: CommunicationService;
    public static getInstance(): CommunicationService {
        if(CommunicationService.instance === undefined) CommunicationService.instance = new CommunicationService();
        return CommunicationService.instance;
    }
    
    public getLights(): void {
        this.socket.emit("GetLights");
    }

    public getGroups(): void {
        this.socket.emit("GetGroups");
    }

    public setLightState(id: string, state: SuperSimpleLightState): void {
        this.socket.emit("SetLightState", id, state);
    }
    
    public setGroupState(id: string, state: SuperSimpleLightState): void {
        this.socket.emit("SetGroupState", id, state);
	}

    public onRefreshAsObservable(): Observable<void> {
        return this.onRefresh.asObservable();
    }

    public onLightOrGroupChangedAsObservable(): Observable<{lights: Array<SuperSimpleLight>, groups: Array<SuperSimpleLightGroup>}> {
        return this.onLightOrGroupChanged.asObservable();
    }

    public onLightsAsObservable(): Observable<Array<SuperSimpleLight>> {
        return this.onLights.asObservable();
    }

    public onGroupsAsObservable(): Observable<Array<SuperSimpleLightGroup>> {
        return this.onGroups.asObservable();
    }
}