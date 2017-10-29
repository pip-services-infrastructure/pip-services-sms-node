import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class SmsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('sms');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sms', 'controller', 'default', '*', '1.0'));
    }
}