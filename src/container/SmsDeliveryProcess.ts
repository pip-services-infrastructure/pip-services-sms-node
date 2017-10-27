import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { SmsDeliveryServiceFactory } from '../build/SmsDeliveryServiceFactory';

export class SmsDeliveryProcess extends ProcessContainer {

    public constructor() {
        super("sms_delivery", "Sms delivery microservice");
        this._factories.add(new SmsDeliveryServiceFactory);
    }


}
