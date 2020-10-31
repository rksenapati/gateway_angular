import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PaymentInterface } from 'src/model/Interface.model';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const postPayment : PaymentInterface[] = [];
        return {postPayment};
      }

}