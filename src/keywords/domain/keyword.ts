import { Keyword } from '../entity';
import { UserDomain } from '../../users/domain/user';

export class KeywordDomain {
    accessor id: number;
    accessor keyword: string;
    accessor keywordHash: string;
    accessor users: UserDomain[];
    constructor(
        id: number,
        keyword: string,
        keywordHash: string,
        users: UserDomain[]
    ) {
        this.id = id;
        this.keyword = keyword;
        this.keywordHash = keywordHash;
        this.users = users;
    }

    public static fromTypeORM(keywordTypeOrmEntity: Keyword): KeywordDomain {
        return new KeywordDomain(
            keywordTypeOrmEntity.id,
            keywordTypeOrmEntity.keyword,
            keywordTypeOrmEntity.keywordHash,
            keywordTypeOrmEntity.users.map<UserDomain>((u) =>
                UserDomain.fromTypeORM(u)
            )
        );
    }

    public static fromTypeORMWithoutUser(
        keywordTypeOrmEntity: Keyword
    ): KeywordDomain {
        return new KeywordDomain(
            keywordTypeOrmEntity.id,
            keywordTypeOrmEntity.keyword,
            keywordTypeOrmEntity.keywordHash,
            (keywordTypeOrmEntity.users = [])
        );
    }
}
