import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { SmsServiceFactory } from '../build/SmsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class SmsProcess extends ProcessContainer {

    public constructor() {
        super("sms", "Sms delivery microservice");
        this._factories.add(new SmsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
