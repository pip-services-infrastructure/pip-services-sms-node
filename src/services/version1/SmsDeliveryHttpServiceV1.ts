import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class SmsDeliveryHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('sms_delivery');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-smsdelivery', 'controller', 'default', '*', '1.0'));
    }
}