import IORedis from 'ioredis';
import { ENV_LIST } from '../env-config';

export const jobQueueConnection = new IORedis({
    host: 'job-queue-redis',
    port: 6380,
    password: ENV_LIST.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
});
