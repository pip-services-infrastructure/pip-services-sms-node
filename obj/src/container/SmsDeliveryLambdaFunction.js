"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const SmsDeliveryServiceFactory_1 = require("../build/SmsDeliveryServiceFactory");
class SmsDeliveryLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("sms_delivery", "Sms delivery function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-smsdelivery', 'controller', 'default', '*', '*'));
        this._factories.add(new SmsDeliveryServiceFactory_1.SmsDeliveryServiceFactory());
    }
}
exports.SmsDeliveryLambdaFunction = SmsDeliveryLambdaFunction;
exports.handler = new SmsDeliveryLambdaFunction().getHandler();
//# sourceMappingURL=SmsDeliveryLambdaFunction.js.map