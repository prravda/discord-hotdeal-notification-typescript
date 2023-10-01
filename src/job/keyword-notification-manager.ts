import {
    FmKoreaGeneralHotDeal,
    FmKoreaPopularHotDeal,
    PpomppuHotDeal,
} from '../../types';
import { Notification } from './events';
import { discordNotificationJobQueue } from './queues/discord-notification';
import { HOT_DEAL_SOURCE } from '../../infra/enums';
import { KeywordSearchRepositoryInstance } from '../keyword-search/repository-instance';
import { KeywordServiceInstance } from '../keywords/service-instance';
import { createHash } from '../../helpers';
import { LokiLogger } from '../../infra/logger/loki-logger';
import { KeywordDomain } from '../keywords/domain/keyword';

export const keywordNotificationManager = async (
    hotDeal: FmKoreaGeneralHotDeal | FmKoreaPopularHotDeal | PpomppuHotDeal,
    hotDealSource: HOT_DEAL_SOURCE
) => {
    try {
        const triggeredKeywordList =
            await KeywordSearchRepositoryInstance.getRepository().searchInSentence(
                hotDeal.title
            );

        LokiLogger.getLogger().info({
            labels: {
                origin: 'keyword-detection',
            },
            message: {
                title: hotDeal.title,
                triggeredKeywordList,
            },
        });

        const keywordAndUserInfo: KeywordDomain[] = [];

        if (triggeredKeywordList.length > 0) {
            // query to database if only triggered keywords are exist
            const keywordsAndSubscribedUsers =
                await KeywordServiceInstance.getService().getKeywordAndSubscriberListByKeywordHashList(
                    triggeredKeywordList.map<string>((keyword) =>
                        createHash(keyword)
                    )
                );
            keywordAndUserInfo.push(...keywordsAndSubscribedUsers);
        }

        const notifications: Notification<
            FmKoreaGeneralHotDeal | FmKoreaPopularHotDeal | PpomppuHotDeal
        >[] = [];

        for (const eachKeyword of keywordAndUserInfo) {
            const { keyword, users } = eachKeyword;
            for (const user of users) {
                const { userId, cameFrom } = user;
                notifications.push({
                    destination: cameFrom,
                    userId,
                    hotDealSource,
                    triggeredKeyword: keyword,
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
    } catch (e) {
        const errorAsErrorObject = e as Error;
        LokiLogger.getLogger().error({
            label: {
                origin: 'keyword-detection',
            },
            stack: `${errorAsErrorObject.stack}`,
        });
        throw e;
    }
};
