import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class SmsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/sms');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sms', 'controller', 'default', '*', '1.0'));
    }
}