import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { SmsServiceFactory } from '../build/SmsServiceFactory';

export class SmsProcess extends ProcessContainer {

    public constructor() {
        super("sms", "Sms delivery microservice");
        this._factories.add(new SmsServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }


}
