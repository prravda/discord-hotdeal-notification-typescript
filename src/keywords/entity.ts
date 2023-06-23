import {
    Column,
    Entity,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
    Index,
} from 'typeorm';
import { User } from '../users/entity';

@Entity({
    name: 'keyword',
})
@Index(['keywordHash'])
export class Keyword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    keyword: string;

    @Column()
    keywordHash: string;

    @ManyToMany(() => User, (user) => user.keywords, {
        cascade: true,
    })
    @JoinTable({
        name: 'keyword_user',
    })
    users: User[];
}
