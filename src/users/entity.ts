import {
    Column,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Keyword } from '../keywords/entity';
import { USER_CAME_FROM } from './etc/USER_CAME_FROM';

@Entity({
    name: 'user',
})
@Index(['userId'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    cameFrom: USER_CAME_FROM;

    @ManyToMany(() => Keyword, (keyword) => keyword.users)
    keywords: Keyword[];
}
