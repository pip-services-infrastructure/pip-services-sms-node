"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const SmsDeliveryServiceFactory_1 = require("../build/SmsDeliveryServiceFactory");
class SmsDeliveryProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("sms_delivery", "Sms delivery microservice");
        this._factories.add(new SmsDeliveryServiceFactory_1.SmsDeliveryServiceFactory);
    }
}
exports.SmsDeliveryProcess = SmsDeliveryProcess;
//# sourceMappingURL=SmsDeliveryProcess.js.map