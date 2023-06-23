import { Keyword } from '../entity';
import { UserDomain } from '../../users/domain/user';

export class KeywordDomain {
    constructor(
        private readonly _id: number,
        private readonly _keyword: string,
        private readonly _keywordHash: string,
        private readonly _users: UserDomain[]
    ) {}

    get id(): number {
        return this._id;
    }

    get keyword(): string {
        return this._keyword;
    }

    get keywordHash(): string {
        return this._keywordHash;
    }

    get users(): UserDomain[] {
        return this._users;
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
