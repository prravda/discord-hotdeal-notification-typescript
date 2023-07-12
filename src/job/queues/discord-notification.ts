import { Queue } from 'bullmq';
import { BasicHotDeal } from '../../../types';
import { Notification } from '../events';
import { jobQueueConnection } from '../../../infra/job-queue/job-queue-connection';

export const discordNotificationJobQueue = new Queue<
    Notification<BasicHotDeal>
>('DiscordNotification', {
    connection: jobQueueConnection,
});
