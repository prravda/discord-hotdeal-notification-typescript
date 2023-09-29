import { KeywordService } from './service';
import { KeywordRepository } from './repository';
import { AppDataSource } from '../../infra/database/app-datasource';
import { Keyword } from './entity';

export class KeywordServiceInstance {
    private static serviceInstance: KeywordService;

    public static getService() {
        if (!this.serviceInstance) {
            this.serviceInstance = new KeywordService(
                new KeywordRepository(
                    AppDataSource.getDataSource().getRepository<Keyword>(
                        Keyword
                    )
                )
            );
        }
        return this.serviceInstance;
    }
}
