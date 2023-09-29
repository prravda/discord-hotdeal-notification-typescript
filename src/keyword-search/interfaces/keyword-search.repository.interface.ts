export interface KeywordSearchRepositoryInterface {
    searchInSentence(hotDealTitle: string): Promise<string[]>;
}
