import { Client, Events, GatewayIntentBits } from 'discord.js';
import { ClientInstance } from './client';
import { CommandManager } from './command-manager';
import { ENV_LIST } from '../../infra/env-config';

const { Guilds, GuildMessages } = GatewayIntentBits;
export class DiscordEntryPoint {
    private readonly discordClient: Client;
    constructor(private readonly commandManager: CommandManager) {
        this.discordClient = ClientInstance.getClient({
            intents: [Guilds, GuildMessages],
        });
    }

    public async startClient() {
        try {
            const slashCommandSet =
                await this.commandManager.enrollCommandAndGetCommandCollection();

            this.discordClient.on(
                Events.InteractionCreate,
                async (interaction) => {
                    if (interaction.isChatInputCommand()) {
                        const command = slashCommandSet.get(
                            interaction.commandName
                        );

                        if (!command) {
                            throw new Error(
                                `No command matching ${interaction.commandName} was found`
                            );
                        }
                        await command.execute(interaction);
                    }
                }
            );
        } catch (e) {
            throw e;
        } finally {
            await this.discordClient.login(ENV_LIST.DISCORD_TOKEN);
        }
    }
}
