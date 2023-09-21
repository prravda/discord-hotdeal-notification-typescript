import { Queue } from 'bullmq';
import {
    BasicHotDeal,
    FmKoreaGeneralHotDeal,
    FmKoreaPopularHotDeal,
    PpomppuHotDeal,
} from '../../../types';
import { Notification } from '../events';
import { jobQueueConnection } from '../../../infra/job-queue/job-queue-connection';

export const discordNotificationJobQueue = new Queue<
    Notification<FmKoreaGeneralHotDeal | FmKoreaPopularHotDeal | PpomppuHotDeal>
>('DiscordNotification', {
    connection: jobQueueConnection,
});
