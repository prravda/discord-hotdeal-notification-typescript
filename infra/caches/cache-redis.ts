import Redis from 'ioredis';
import { ENV_LIST } from '../env-config';

export const redisConnection = new Redis({
    host: 'cache-redis',
    port: 6379,
    password: ENV_LIST.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
});
