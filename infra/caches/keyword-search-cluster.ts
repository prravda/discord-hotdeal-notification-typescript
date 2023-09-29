import { Cluster } from 'ioredis';
import { ENV_LIST } from '../env-config';

export const keywordSearchCluster = new Cluster(
    [
        { host: 'keyword-dragonflydb-write-0', port: 6382 },
        { host: 'keyword-dragonflydb-read-0', port: 6383 },
    ],
    {
        scaleReads: 'slave',
        redisOptions: {
            password: ENV_LIST.REDIS_PASSWORD,
        },
    }
);
