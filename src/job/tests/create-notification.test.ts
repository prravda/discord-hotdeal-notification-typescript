import { FmKoreaGeneralHotDeal } from '../../../types';

describe('test', () => {
    it('should validate the type based on instance', () => {
        const mockFmKoreaGeneralHotDeal: FmKoreaGeneralHotDeal = {
            id: 123,
            title: '팔도 비빔장 시그니처',
            link: 'https://mock-fmkorea.com',
            seller: '지마켓',
            productPrice: '35,420',
            shippingCharge: '무배',
            category: '먹거리',
        };

        expect(mockFmKoreaGeneralHotDeal).toBeInstanceOf(FmKoreaGeneralHotDeal);
    });
});
