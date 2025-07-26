import { IredisService } from "../../domain/interface/serviceInterfaces/redisServiceInterface";
import { createClient, RedisClientType } from "redis";
export class RedisService implements IredisService {
    private redis: RedisClientType
    constructor() {
        this.redis = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
                reconnectStrategy: (retries: number) => {
                    if (retries > 10) return new Error('Too many Retries');
                    return Math.min(retries * 100, 3000)
                }
            }
        })
        this.redis.on('error', (err) => console.log('Redis Client Error:', err))
        this.redis.on('connect', () => console.log('Redis Client Connected'))
        this.redis.on('end', () => console.log('Redis Client Disconnected'))
    }
    public async connect(): Promise<void> {
        if (!this.redis.isOpen) {
            await this.redis.connect()
        }
    }
    public async disconnect(): Promise<void> {
        if (this.redis.isOpen) {
            await this.redis.quit()
        }
    }
    public async get(key: string): Promise<string | null> {
        if (!this.redis.isOpen) {
            await this.redis.connect()
        }
        if (!key) return null
        try {
            return await this.redis.get(key)
        } catch (error) {
            console.log(`Error getting key ${error}`)
            throw error
        }
    }
    public async set(key: string, seconds: number, value: string): Promise<void> {
        if (!this.redis.isOpen) {
            await this.redis.connect()
        }
        try {
            await this.redis.set(key, value, { EX: seconds })
        } catch (error) {
            console.log(`error while deleting key ${error}`)
            throw error
        }
    }
    public async del(key: string): Promise<void> {
        if (!this.redis.isOpen) {
            await this.redis.connect()
        }
        if (!key) return
        try {
            await this.redis.del(key)
        } catch (error) {
            console.log(`Error Deleting key ${error}`)
            throw error
        }
    }
    public getClient(): RedisClientType {
        return this.redis
    }
}


export default new RedisService()