import { KeywordSearchRepositoryInterface } from './interfaces/keyword-search.repository.interface';
import { KeywordSearchRepository } from './keyword-search.repository';
import { keywordSearchCluster } from '../../infra/caches/keyword-search-cluster';

export class KeywordSearchRepositoryInstance {
    private static keywordSearchRepository: KeywordSearchRepositoryInterface;

    public static getRepository() {
        if (!this.keywordSearchRepository) {
            this.keywordSearchRepository = new KeywordSearchRepository(
                keywordSearchCluster
            );
        }

        return this.keywordSearchRepository;
    }
}
