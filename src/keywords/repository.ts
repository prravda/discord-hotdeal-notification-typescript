import { KeywordRepositoryInterface } from './interfaces/keyword-repository.interface';
import { Keyword } from './entity';
import { In, Repository } from 'typeorm';
import { KeywordDomain } from './domain/keyword';

export class KeywordRepository implements KeywordRepositoryInterface {
    constructor(private keywordRepositoryTypeORM: Repository<Keyword>) {}

    public async getKeywordAndSubscriberListByKeywordHashList(
        keywordHashList: string[]
    ): Promise<KeywordDomain[]> {
        const result = await this.keywordRepositoryTypeORM
            .createQueryBuilder('keywords')
            .where({ keywordHash: In([...keywordHashList]) })
            .leftJoinAndSelect('keywords.users', 'users')
            .getMany();

        return result.map<KeywordDomain>((keywordResult) =>
            KeywordDomain.fromTypeORM(keywordResult)
        );
    }
}
