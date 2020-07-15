import {Subject} from "rxjs";
import moment, { Moment } from 'moment';

export class EventService {
    protected static eventPipe = new Subject();
    constructor() {}

    public triggerEvent<T>(event: T): void {
        EventService.eventPipe.next(event);
    }

}

export var DEFAULT_EVENT_SERVICE = new EventService(); 

export declare type EventType = "Message" | "Query" | "Config Message" | "Price Lookup" | "Ammo Lookup"
                                | "User Config Set" | "User Config Get" | "Redis Set" | "Redis Get"
                                | "Initialize Ammo Index" | "Initialize Price Index";
