import { KeywordRepositoryInterface } from './interfaces/keyword-repository.interface';
import { AppDataSource } from '../../infra/database/app-datasource';
import { Keyword } from './entity';
import { Repository } from 'typeorm';
import { User } from '../users/entity';

export class KeywordRepository implements KeywordRepositoryInterface {
    private keywordRepositoryTypeORM: Repository<Keyword>;
    private userRepositoryTypeORM: Repository<User>;
    constructor() {
        this.keywordRepositoryTypeORM =
            AppDataSource.getDataSource().getRepository<Keyword>(Keyword);
        this.userRepositoryTypeORM =
            AppDataSource.getDataSource().getRepository<User>(User);
    }
}
