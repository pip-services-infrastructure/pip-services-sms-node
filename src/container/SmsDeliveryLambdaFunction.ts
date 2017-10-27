import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { SmsDeliveryServiceFactory } from '../build/SmsDeliveryServiceFactory';

export class SmsDeliveryLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("sms_delivery", "Sms delivery function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-smsdelivery', 'controller', 'default', '*', '*'));
        this._factories.add(new SmsDeliveryServiceFactory());
    }
}

export const handler = new SmsDeliveryLambdaFunction().getHandler();