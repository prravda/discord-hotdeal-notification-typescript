import IORedis from 'ioredis';

export const jobQueueConnection = new IORedis({
    host: 'job-queue-redis',
    port: 6380,
    maxRetriesPerRequest: null,
});
