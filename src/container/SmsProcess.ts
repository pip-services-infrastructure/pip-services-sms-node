import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { SmsServiceFactory } from '../build/SmsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class SmsProcess extends ProcessContainer {

    public constructor() {
        super("sms", "Sms delivery microservice");
        this._factories.add(new SmsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
