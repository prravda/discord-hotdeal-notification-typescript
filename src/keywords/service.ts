import { KeywordRepositoryInterface } from './interfaces/keyword-repository.interface';

export class KeywordService {
    constructor(
        private readonly keywordRepository: KeywordRepositoryInterface
    ) {}
}
