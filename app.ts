import 'reflect-metadata';
import 'dotenv/config';
import { DiscordEntryPoint } from './src/discord/entrypoint';
import { CommandManager } from './src/discord/command-manager';
import { BrokerConsumer } from './infra/broker/broker-consumer';
import { Message } from 'memphis-dev';
import { JobController } from './src/job/controller';
import { HotDealUpdated } from './infra/broker/events/hot-deal-updated';
import { discordKeywordNotificationWorker } from './src/job/keyword-notification-worker';

const bootstrap = async () => {
    try {
        // init discord application
        const discordApp = new DiscordEntryPoint(new CommandManager([]));
        await discordApp.startClient();

        // init broker - consumer
        await BrokerConsumer.start();
        const consumer = await BrokerConsumer.get();

        // pass hot deal updated event to JobController
        consumer.on('message', async (message: Message) => {
            const event = message.getDataAsJson() as HotDealUpdated;
            await JobController(event);
            message.ack();
        });

        // run worker
        await discordKeywordNotificationWorker.run();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

bootstrap();
