import Redis from 'ioredis';

export const redisConnection = new Redis({
    host: 'cache-redis',
    port: 6379,
    maxRetriesPerRequest: null,
});
