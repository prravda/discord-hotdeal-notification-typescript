import 'dotenv/config';
import Joi from 'joi';

const envListSchema = Joi.object({
    DISCORD_TOKEN: Joi.string()
        .required()
        .description('discord bot application token'),
    DISCORD_API_VERSION: Joi.string()
        .required()
        .description('discord API version number as string'),
    DISCORD_APPLICATION_ID: Joi.string()
        .required()
        .description('discord application id as string'),
    DISCORD_GUILD_ID: Joi.string()
        .required()
        .description('discord server(guild) id'),
    DISCORD_CLIENT_ID: Joi.string()
        .required()
        .description(`discord bot's client id`),
    DISCORD_CLIENT_SECRET: Joi.string()
        .required()
        .description(`discord bot's client secret token`),

    MEMPHIS_USER_NOTIFICATION_MANAGER_USER_NAME: Joi.string()
        .required()
        .description('hot deal subscriber id of memphis'),
    MEMPHIS_USER_NOTIFICATION_MANAGER_PASSWORD: Joi.string()
        .required()
        .description('hot deal subscriber password of memphis'),
    MEMPHIS_STATION_NAME: Joi.string()
        .required()
        .description('name of station'),
    MEMPHIS_PRODUCER_NAME: Joi.string()
        .required()
        .description('name of producer'),
    HOT_DEAL_UPDATED_EVENT_VERSION: Joi.number()
        .required()
        .description('version of hot deal updated event'),

    DATABASE_USER: Joi.string().required().description('database username'),
    DATABASE_PASSWORD: Joi.string().required().description('database password'),
    DATABASE_NAME: Joi.string().required().description('database db name'),
}).unknown();

const validateEnvList = () => {
    const { error, value } = envListSchema.validate(process.env);

    if (error) {
        throw new Error(`Validation Error: ${error.message}`);
    }

    return value;
};

const afterValidate = validateEnvList();

export const ENV_LIST = {
    DISCORD_TOKEN: afterValidate.DISCORD_TOKEN as string,
    DISCORD_API_VERSION: afterValidate.DISCORD_API_VERSION as string,
    DISCORD_APPLICATION_ID: afterValidate.DISCORD_APPLICATION_ID as string,
    DISCORD_GUILD_ID: afterValidate.DISCORD_GUILD_ID as string,
    DISCORD_CLIENT_ID: afterValidate.DISCORD_CLIENT_ID as string,
    DISCORD_CLIENT_SECRET: afterValidate.DISCORD_CLIENT_SECRET as string,

    MEMPHIS_USER_NOTIFICATION_MANAGER_USER_NAME:
        afterValidate.MEMPHIS_USER_NOTIFICATION_MANAGER_USER_NAME as string,
    MEMPHIS_USER_NOTIFICATION_MANAGER_PASSWORD:
        afterValidate.MEMPHIS_USER_NOTIFICATION_MANAGER_PASSWORD as string,
    MEMPHIS_STATION_NAME: afterValidate.MEMPHIS_STATION_NAME as string,
    MEMPHIS_PRODUCER_NAME: afterValidate.MEMPHIS_PRODUCER_NAME as string,
    HOT_DEAL_UPDATED_EVENT_VERSION:
        afterValidate.HOT_DEAL_UPDATED_EVENT_VERSION as number,

    DATABASE_USER: afterValidate.DATABASE_USER as string,
    DATABASE_PASSWORD: afterValidate.DATABASE_PASSWORD as string,
    DATABASE_NAME: afterValidate.DATABASE_NAME as string,
};
