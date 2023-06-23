import { DiscordCommandEnrollResponse, SlashCommand } from '../../types';
import { Collection, REST, Routes } from 'discord.js';
import { ENV_LIST } from '../../infra/env-config';

export class CommandManager {
    constructor(private readonly slashCommands: SlashCommand[]) {}

    private async enrollCommands() {
        const restClient = new REST({
            version: ENV_LIST.DISCORD_API_VERSION,
        }).setToken(ENV_LIST.DISCORD_TOKEN);

        try {
            const enrollResponse = (await restClient.put(
                Routes.applicationGuildCommands(
                    ENV_LIST.DISCORD_CLIENT_ID,
                    ENV_LIST.DISCORD_GUILD_ID
                ),
                { body: this.slashCommands.map((c) => c.command.toJSON()) }
            )) as DiscordCommandEnrollResponse[];

            console.log(
                `Enrollment result: ${enrollResponse.length} commands are successfully enrolled`
            );
            console.log(`${enrollResponse.map((r) => r.name)}`);
        } catch (e) {
            throw e;
        }
    }

    private getSlashCommandCollection() {
        try {
            const slashCommandCollection = new Collection<
                string,
                SlashCommand
            >();

            this.slashCommands.forEach((c) => {
                slashCommandCollection.set(c.command.name, c);
            });

            return slashCommandCollection;
        } catch (e) {
            throw e;
        }
    }

    public async enrollCommandAndGetCommandCollection() {
        // await this.enrollCommands();
        return this.getSlashCommandCollection();
    }
}
