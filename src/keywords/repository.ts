import { KeywordRepositoryInterface } from './interfaces/keyword-repository.interface';
import { AppDataSource } from '../../infra/database/app-datasource';
import { Keyword } from './entity';
import { Repository } from 'typeorm';

export class KeywordRepository implements KeywordRepositoryInterface {
    private keywordRepositoryTypeORM: Repository<Keyword>;
    constructor() {
        this.keywordRepositoryTypeORM =
            AppDataSource.getDataSource().getRepository<Keyword>(Keyword);
    }
}
