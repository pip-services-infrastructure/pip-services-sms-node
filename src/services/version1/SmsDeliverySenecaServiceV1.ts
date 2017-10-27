import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class SmsDeliverySenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('sms_delivery');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-smsdelivery', 'controller', 'default', '*', '1.0'));
    }
}