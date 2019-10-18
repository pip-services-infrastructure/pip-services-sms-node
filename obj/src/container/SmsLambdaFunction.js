"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const SmsServiceFactory_1 = require("../build/SmsServiceFactory");
class SmsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("sms", "Sms delivery function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-sms', 'controller', 'default', '*', '*'));
        this._factories.add(new SmsServiceFactory_1.SmsServiceFactory());
    }
}
exports.SmsLambdaFunction = SmsLambdaFunction;
exports.handler = new SmsLambdaFunction().getHandler();
//# sourceMappingURL=SmsLambdaFunction.js.map