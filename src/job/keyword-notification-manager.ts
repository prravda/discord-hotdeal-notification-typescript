import {
    FmKoreaGeneralHotDeal,
    FmKoreaPopularHotDeal,
    PpomppuHotDeal,
} from '../../types';
import { KeywordAndUserInfo } from './types/keyword-and-user.info';
import { Notification } from './events';
import { redisConnection } from '../../infra/caches/cache-redis';
import { discordNotificationJobQueue } from './queues/discord-notification';
import { HOT_DEAL_SOURCE } from '../../infra/enums';

export const extractKeywordAndUserInfoListUsingKeyList = async (
    keyList: string[]
) => {
    const promiseShouldBeResolved = [];

    for (const key of keyList) {
        promiseShouldBeResolved.push(redisConnection.hgetall(key));
    }

    const beforeParsed = await Promise.all(promiseShouldBeResolved);

    return beforeParsed.map<KeywordAndUserInfo>((info) => {
        return {
            userId: info.userId,
            cameFrom: Number(info.cameFrom),
            keyword: info.keyword,
            keywordInLowerCase: info.keyword.toLowerCase(),
        };
    });
};

export const keywordNotificationManager = async (
    hotDeal: FmKoreaGeneralHotDeal | FmKoreaPopularHotDeal | PpomppuHotDeal,
    hotDealSource: HOT_DEAL_SOURCE
) => {
    const keyList = await redisConnection.keys('*');

    const keywordAndUserInfo = await extractKeywordAndUserInfoListUsingKeyList(
        keyList
    );

    const notifications: Notification<
        FmKoreaGeneralHotDeal | FmKoreaPopularHotDeal | PpomppuHotDeal
    >[] = [];

    for (const info of keywordAndUserInfo) {
        if (hotDeal.title.toLowerCase().includes(info.keywordInLowerCase)) {
            notifications.push({
                destination: info.cameFrom,
                userId: info.userId,
                triggeredKeyword: info.keyword,
                hotDealSource,
                relatedHotDeal: hotDeal,
            });
        }
    }

    if (notifications.length > 0) {
        await discordNotificationJobQueue.addBulk(
            notifications.map((notification) => {
                return {
                    name: 'DiscordNotification',
                    data: notification,
                    opts: {
                        removeOnComplete: true,
                        delay: 1_000,
                    },
                };
            })
        );
    }
};
