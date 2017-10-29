import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { SmsServiceFactory } from '../build/SmsServiceFactory';

export class SmsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("sms", "Sms delivery function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sms', 'controller', 'default', '*', '*'));
        this._factories.add(new SmsServiceFactory());
    }
}

export const handler = new SmsLambdaFunction().getHandler();