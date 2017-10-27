"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class SmsDeliverySenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('sms_delivery');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-smsdelivery', 'controller', 'default', '*', '1.0'));
    }
}
exports.SmsDeliverySenecaServiceV1 = SmsDeliverySenecaServiceV1;
//# sourceMappingURL=SmsDeliverySenecaServiceV1.js.map