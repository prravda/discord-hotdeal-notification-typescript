import { KeywordRepositoryInterface } from './interfaces/keyword-repository.interface';
import { Keyword } from './entity';
import { KeywordDomain } from './domain/keyword';

export class KeywordService {
    constructor(
        private readonly keywordRepository: KeywordRepositoryInterface
    ) {}

    public async getKeywordAndSubscriberListByKeywordHashList(
        keywordHashList: string[]
    ): Promise<KeywordDomain[]> {
        return await this.keywordRepository.getKeywordAndSubscriberListByKeywordHashList(
            keywordHashList
        );
    }
}
