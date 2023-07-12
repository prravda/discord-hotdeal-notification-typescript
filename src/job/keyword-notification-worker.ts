import { Worker } from 'bullmq';
import { Notification } from './events';
import {
    BasicHotDeal,
    FmKoreaGeneralHotDeal,
    FmKoreaPopularHotDeal,
    PpomppuHotDeal,
} from '../../types';
import { ClientInstance } from '../discord/client';
import { EmbedBuilder } from 'discord.js';
import { jobQueueConnection } from '../../infra/job-queue/job-queue-connection';
import { HOT_DEAL_SOURCE } from '../../infra/enums';

export const discordKeywordNotificationWorker = new Worker<
    Notification<FmKoreaGeneralHotDeal | FmKoreaPopularHotDeal | PpomppuHotDeal>
>(
    'DiscordNotification',
    async (job) => {
        const { userId, triggeredKeyword, relatedHotDeal, hotDealSource } =
            job.data;

        const discordClient = ClientInstance.getClient();

        const embedContent = new EmbedBuilder();

        if (hotDealSource == HOT_DEAL_SOURCE.FMKOREA_GENERAL) {
            const fmKoreaGeneralHotDeal =
                relatedHotDeal as FmKoreaGeneralHotDeal;
            embedContent.setTitle(
                `펨코에서 ${triggeredKeyword} 와 관련된 핫딜이 올라왔어요!`
            );

            const title = fmKoreaGeneralHotDeal.title;
            const link = fmKoreaGeneralHotDeal.link;

            const seller = fmKoreaGeneralHotDeal.seller;
            const category = fmKoreaGeneralHotDeal.category;
            const productPrice = fmKoreaGeneralHotDeal.productPrice;
            const shippingCharge = fmKoreaGeneralHotDeal.shippingCharge;

            embedContent.addFields({
                name: `[${category}]${title} / ⛺️: ${seller} / 💵: ${productPrice} / 📦: ${shippingCharge}`,
                value: `[└─해당 핫 딜 바로가기(클릭)](${link})`,
            });
        }

        if (hotDealSource == HOT_DEAL_SOURCE.FMKOREA_POPULAR) {
            const fmKoreaPopularHotDeal =
                relatedHotDeal as FmKoreaPopularHotDeal;
            embedContent.setTitle(
                `펨코에서 ${triggeredKeyword} 와 관련된 핫딜이 올라왔어요!`
            );

            const title = fmKoreaPopularHotDeal.title;
            const link = fmKoreaPopularHotDeal.link;

            embedContent.addFields({
                name: `🔥 ${title} 🔥`,
                value: `[└─해당 핫 딜 바로가기(클릭)](${link})`,
            });
        }

        if (hotDealSource == HOT_DEAL_SOURCE.PPOMPPU_GENERAL) {
            const ppomppuHotDeal = relatedHotDeal as PpomppuHotDeal;
            embedContent.setTitle(
                `뽐뿌에서 ${triggeredKeyword} 와 관련된 핫딜이 올라왔어요!`
            );

            const title = ppomppuHotDeal.title;
            const link = ppomppuHotDeal.link;

            embedContent.addFields({
                name: `${title}`,
                value: `[└─해당 핫 딜 바로가기(클릭)](${link})`,
            });
        }

        if (discordClient) {
            await discordClient.users.send(userId, {
                embeds: [embedContent],
            });
        }
    },
    {
        autorun: false,
        connection: jobQueueConnection,
        limiter: {
            max: 20,
            duration: 1_000,
        },
    }
);
