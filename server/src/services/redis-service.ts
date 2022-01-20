import { promisify } from 'util';
import { createClient, RedisClient } from 'redis';

declare type AsyncRedisClient = RedisClient & { getAsync: (key: string) => Promise<string>, setAsync: (key: string, value: string) => Promise<void> };
export class RedisService {
    private readonly client: AsyncRedisClient;
    private constructor() {
        this.client = createClient() as any;
        this.client.getAsync = promisify(this.client.get).bind(this.client);
        this.client.setAsync = promisify(this.client.set).bind(this.client);
    }

    private static instance: RedisService;
    public static getInstance(): RedisService {
        if (!this.instance) {
            this.instance = new RedisService();
        }

        return this.instance;
    }

    public getValue(key: string): Promise<string> {
        return this.client.getAsync(key);
    }

    public async setValue(key: string, value: string): Promise<void> {
        await this.client.setAsync(key, value);
    }
}