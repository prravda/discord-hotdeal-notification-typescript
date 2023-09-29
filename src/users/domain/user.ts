import { USER_CAME_FROM } from '../etc/USER_CAME_FROM';
import { User } from '../entity';

export class UserDomain {
    accessor id: number;
    accessor userId: string;
    accessor cameFrom: USER_CAME_FROM;
    constructor(id: number, userId: string, cameFrom: USER_CAME_FROM) {
        this.id = id;
        this.userId = userId;
        this.cameFrom = cameFrom;
    }

    public static fromTypeORM(userTypeOrmEntity: User): UserDomain {
        return new UserDomain(
            userTypeOrmEntity.id,
            userTypeOrmEntity.userId,
            userTypeOrmEntity.cameFrom
        );
    }
}
