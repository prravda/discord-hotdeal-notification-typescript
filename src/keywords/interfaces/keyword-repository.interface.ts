import { KeywordDomain } from '../domain/keyword';

export interface KeywordRepositoryInterface {
    getKeywordAndSubscriberListByKeywordHashList(
        keywordHashList: string[]
    ): Promise<KeywordDomain[]>;
}
