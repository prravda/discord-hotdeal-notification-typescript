import { HotDealUpdated } from '../../infra/broker/events/hot-deal-updated';
import { keywordNotificationManager } from './keyword-notification-manager';

export const JobController = async (event: HotDealUpdated) => {
    await Promise.all(
        event.listOfHotDeal.map((hotDeal) => {
            keywordNotificationManager(hotDeal, event.hotDealSource);
        })
    );
};
