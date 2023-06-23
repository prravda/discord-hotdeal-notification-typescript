import { memphis, Memphis, Consumer } from 'memphis-dev';
import { ENV_LIST } from '../env-config';

export class BrokerConsumer {
    private static memphisConnection: Memphis;
    private static memphisConsumer: Consumer;

    public static async start() {
        if (!this.memphisConnection) {
            this.memphisConnection = await memphis.connect({
                host: 'memphis',
                username: ENV_LIST.MEMPHIS_USER_NOTIFICATION_MANAGER_USER_NAME,
                password: ENV_LIST.MEMPHIS_USER_NOTIFICATION_MANAGER_PASSWORD,
            });
        }
    }

    public static async get() {
        if (!this.memphisConsumer) {
            this.memphisConsumer = await this.memphisConnection.consumer({
                stationName: ENV_LIST.MEMPHIS_STATION_NAME,
                consumerName: ENV_LIST.MEMPHIS_CONSUMER_NAME,
                consumerGroup: ENV_LIST.MEMPHIS_CONSUMER_GROUP_NAME,
            });
        }

        return this.memphisConsumer;
    }
}
