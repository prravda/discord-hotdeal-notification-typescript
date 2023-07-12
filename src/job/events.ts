import { USER_CAME_FROM } from '../users/etc/USER_CAME_FROM';
import { HOT_DEAL_SOURCE } from '../../infra/enums';

export interface Notification<T> {
    destination: USER_CAME_FROM;
    userId: string;
    hotDealSource: HOT_DEAL_SOURCE;
    triggeredKeyword: string;
    relatedHotDeal: T;
}
