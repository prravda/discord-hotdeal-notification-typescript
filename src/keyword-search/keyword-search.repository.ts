import { Cluster } from 'ioredis';
import { KeywordSearchRepositoryInterface } from './interfaces/keyword-search.repository.interface';
import { TyniSearch } from 'tynisearch';

export class KeywordSearchRepository
    implements KeywordSearchRepositoryInterface
{
    constructor(private readonly keywordSearchCluster: Cluster) {}

    private async getSerializedTrieFromSlaveNodes(): Promise<string> {
        try {
            const serializedTrie = await this.keywordSearchCluster.get(
                'keywords'
            );

            if (!serializedTrie) {
                throw new Error('No trie found in storage');
            }
            // if trie on 'keywords' exists, just return it
            return serializedTrie;
        } catch (e) {
            throw e;
        }
    }

    private async getParsedTrie(): Promise<TyniSearch> {
        try {
            const serializedTrie = await this.getSerializedTrieFromSlaveNodes();
            return TyniSearch.deserialize(serializedTrie);
        } catch (e) {
            throw e;
        }
    }

    public async searchInSentence(hotDealTitle: string): Promise<string[]> {
        try {
            const trie = await this.getParsedTrie();
            return trie.searchInSentence(hotDealTitle);
        } catch (e) {
            throw e;
        }
    }
}
