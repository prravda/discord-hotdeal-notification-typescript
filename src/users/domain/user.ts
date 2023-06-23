import { USER_CAME_FROM } from '../etc/USER_CAME_FROM';
import { User } from '../entity';

export class UserDomain {
    constructor(
        private readonly _id: number,
        private readonly _userId: string,
        private readonly _cameFrom: USER_CAME_FROM
    ) {}

    get id(): number {
        return this._id;
    }

    get userId(): string {
        return this._userId;
    }

    get cameFrom(): USER_CAME_FROM {
        return this._cameFrom;
    }

    public static fromTypeORM(userTypeOrmEntity: User): UserDomain {
        return new UserDomain(
            userTypeOrmEntity.id,
            userTypeOrmEntity.userId,
            userTypeOrmEntity.cameFrom
        );
    }
}
