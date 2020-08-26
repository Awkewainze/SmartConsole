import Cookies from "js-cookie";

/**
 * 
 */
export class ConfigurationService {
    private readonly kv: KeyValuesStorage;
    private constructor() {
        if (localStorage) {
            this.kv = new LocalStorageKeyValuesStorage();
        } else {
            this.kv = new CookieKeyValuesStorage();
        }

        if (!this.checkInitiated()) {
            this.setDefaultValues();
            this.setInitiated();
        }
    }

    private static instance: ConfigurationService;
    public static getInstance(): ConfigurationService {
        if (ConfigurationService.instance === undefined) ConfigurationService.instance = new ConfigurationService();
        return ConfigurationService.instance;
    }

    private readonly nameKey = "name";
    public getName(): string {
        return this.kv.getValue(this.nameKey) || "";
    }
    public setName(name: string): void {
        this.kv.setValue(this.nameKey, name);
    }

    private readonly connectEndpointKey = "connectEndpoint";
    public getConnectEndpoint(): string {
        return this.kv.getValue(this.connectEndpointKey) || "";
    }
    public setConnectEndpoint(endpoint: string): void {
        this.kv.setValue(this.connectEndpointKey, endpoint);
    }

    private setDefaultValues(): void {
        this.kv.setValue(this.nameKey, "Set name in Debug");
        this.kv.setValue(this.connectEndpointKey, window.location.protocol + "//" + window.location.hostname + ":" + 3000);
    }

    private readonly initiatedKey = "initiated"
    private checkInitiated(): boolean {
        return !!this.kv.getValue(this.initiatedKey);
    }

    private setInitiated(): void {
        this.kv.setValue(this.initiatedKey, "true");
    }
}


interface KeyValuesStorage {
    getValue(key: string): string | null;
    setValue(key: string, value: string): void;
}

class LocalStorageKeyValuesStorage implements KeyValuesStorage {
    public constructor() { }
    getValue(key: string): string | null {
        return localStorage.getItem(key);
    }

    setValue(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}

class CookieKeyValuesStorage implements KeyValuesStorage {
    public constructor() { }
    getValue(key: string): string | null {
        return Cookies.get(key) || null;
    }

    setValue(key: string, value: string): void {
        Cookies.set(key, value);
    }
}