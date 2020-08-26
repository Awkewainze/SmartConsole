import * as io from "socket.io-client";
import { Observable, Subject } from "rxjs";
import { ConfigurationService } from "~services";

/**
 * 
 */
export class CommunicationService {
    private readonly onRefresh = new Subject<void>();
    private readonly onLightOrGroupChanged = new Subject<{ lights: Array<SuperSimpleLight>, groups: Array<SuperSimpleLightGroup> }>();
    private readonly onLights = new Subject<Array<SuperSimpleLight>>();
    private readonly onGroups = new Subject<Array<SuperSimpleLightGroup>>();
    private readonly configurationService: ConfigurationService = ConfigurationService.getInstance();
    private socket: SocketIOClient.Socket = new NullSocket();

    private constructor() {
        if (!this.attemptConnection()) {
            this.attemptConnectionUntilSuccess();
        }
    }

    private attemptConnectionUntilSuccess(): void {
        let timerId: number;
        timerId = setInterval(() => {
            if (this.attemptConnection()) {
                clearInterval(timerId);
            }
        }, 30000);
    }

    /**
     * returns Successful connection
     */
    private attemptConnection(): boolean {
        try {
            this.socket = io.connect(this.configurationService.getConnectEndpoint(), {});
            this.socket.on("Refresh", () => this.onRefresh.next());
            this.socket.on("LightOrGroupChanged", (...data: any[]) => this.onLightOrGroupChanged.next(...data));
            this.socket.on("Lights", (...data: any[]) => this.onLights.next(...data));
            this.socket.on("Groups", (...data: any[]) => this.onGroups.next(...data));
            return true;
        } catch {
            return false;
        }
    }

    private static instance: CommunicationService;
    public static getInstance(): CommunicationService {
        if (CommunicationService.instance === undefined) CommunicationService.instance = new CommunicationService();
        return CommunicationService.instance;
    }

    /**
     * Request server to resend light status.
     */
    public getLights(): void {
        this.socket.emit("GetLights");
    }

    /**
     * Request server to resend light group status.
     */
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

    public onLightOrGroupChangedAsObservable(): Observable<{ lights: Array<SuperSimpleLight>, groups: Array<SuperSimpleLightGroup> }> {
        return this.onLightOrGroupChanged.asObservable();
    }

    public onLightsAsObservable(): Observable<Array<SuperSimpleLight>> {
        return this.onLights.asObservable();
    }

    public onGroupsAsObservable(): Observable<Array<SuperSimpleLightGroup>> {
        return this.onGroups.asObservable();
    }
}


class NullSocket implements SocketIOClient.Socket {
    io: SocketIOClient.Manager;
    nsp: string;
    id: string;
    connected: boolean;
    disconnected: boolean;

    constructor() {
        this.connected = true;
        this.disconnected = true;
        this.id = "NULL";
        this.nsp = "NULL";
        this.io = null as any as SocketIOClient.Manager;
    }

    open(): SocketIOClient.Socket {
        return this;
    }
    connect(): SocketIOClient.Socket {
        return this;
    }
    send(...args: any[]): SocketIOClient.Socket {
        return this;
    }
    emit(event: string, ...args: any[]): SocketIOClient.Socket {
        return this;
    }
    close(): SocketIOClient.Socket {
        return this;
    }
    disconnect(): SocketIOClient.Socket {
        return this;
    }
    compress(compress: boolean): SocketIOClient.Socket {
        return this;
    }
    on(event: string, fn: Function): SocketIOClient.Emitter {
        throw new Error("Method not implemented.");
    }
    addEventListener(event: string, fn: Function): SocketIOClient.Emitter {
        throw new Error("Method not implemented.");
    }
    once(event: string, fn: Function): SocketIOClient.Emitter {
        throw new Error("Method not implemented.");
    }
    off(event: string, fn?: Function | undefined): SocketIOClient.Emitter {
        throw new Error("Method not implemented.");
    }
    removeListener(event: string, fn?: Function | undefined): SocketIOClient.Emitter {
        throw new Error("Method not implemented.");
    }
    removeEventListener(event: string, fn?: Function | undefined): SocketIOClient.Emitter {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(): SocketIOClient.Emitter {
        throw new Error("Method not implemented.");
    }
    listeners(event: string): Function[] {
        throw new Error("Method not implemented.");
    }
    hasListeners(event: string): boolean {
        throw new Error("Method not implemented.");
    }

}