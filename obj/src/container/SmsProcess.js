"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const SmsServiceFactory_1 = require("../build/SmsServiceFactory");
class SmsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("sms", "Sms delivery microservice");
        this._factories.add(new SmsServiceFactory_1.SmsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.SmsProcess = SmsProcess;
//# sourceMappingURL=SmsProcess.js.map