"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class SmsHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('sms');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-sms', 'controller', 'default', '*', '1.0'));
    }
}
exports.SmsHttpServiceV1 = SmsHttpServiceV1;
//# sourceMappingURL=SmsHttpServiceV1.js.map