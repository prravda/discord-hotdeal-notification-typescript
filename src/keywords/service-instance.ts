import { KeywordService } from './service';
import { KeywordRepository } from './repository';

export class ServiceInstance {
    private static serviceInstance: KeywordService;

    public static get() {
        if (!this.serviceInstance) {
            this.serviceInstance = new KeywordService(new KeywordRepository());
        }
        return this.serviceInstance;
    }
}
