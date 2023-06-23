import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './infra/database/app-datasource';
import { KeywordRepository } from './src/keywords/repository';
import { KeywordService } from './src/keywords/service';
import { DiscordEntryPoint } from './src/discord/entrypoint';
import { CommandManager } from './src/discord/command-manager';
import { KeywordCommandController } from './src/discord/controller/keyword-command.controller';
import { BrokerConsumer } from './infra/broker/broker-consumer';

const bootstrap = async () => {
    try {
        // init broker - consumer
        await BrokerConsumer.start();
        const consumer = await BrokerConsumer.get();

        // init database instance
        await AppDataSource.getDataSource().initialize();

        // init discord application
        const discordApp = new DiscordEntryPoint(
            new KeywordCommandController(
                new KeywordService(new KeywordRepository())
            ),
            new CommandManager([])
        );
        await discordApp.startClient();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

bootstrap();
