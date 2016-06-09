import {Module, ModuleInitOptions} from "microframework/Module";
import {RedisModuleConfig} from "./RedisModuleConfig";
import {RedisClientFactory} from "./RedisClientFactory";
import * as redis from "redis";
import {RedisClient} from "~redis/index";

/**
 * Redis module integration with microframework.
 */
export class RedisModule implements Module {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: RedisModuleConfig;
    private _client: RedisClient;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return "RedisModule";
    }

    getConfigurationName(): string {
        return "redis";
    }

    isConfigurationRequired(): boolean {
        return true;
    }

    init(options: ModuleInitOptions, configuration: RedisModuleConfig): void {
        this.options = options;
        this.configuration = configuration;
    }

    onBootstrap(): Promise<any> {
        this.setupConnection();
        return Promise.resolve();
    }

    onShutdown(): Promise<any> {
        if (this._client)
            this._client.quit();
        
        return Promise.resolve();
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Gets redis client instance.
     */
    get client(): RedisClient {
        return this._client;
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private setupConnection() {
        this._client = redis.createClient(<any> {
            host: this.configuration.host,
            port: this.configuration.port
        });
        const redisClientFactory: RedisClientFactory = this.options.container.get(RedisClientFactory);
        redisClientFactory.client = this._client;
    }

}