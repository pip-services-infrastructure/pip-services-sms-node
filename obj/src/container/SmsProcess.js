"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const SmsServiceFactory_1 = require("../build/SmsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SmsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("sms", "Sms delivery microservice");
        this._factories.add(new SmsServiceFactory_1.SmsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.SmsProcess = SmsProcess;
//# sourceMappingURL=SmsProcess.js.map