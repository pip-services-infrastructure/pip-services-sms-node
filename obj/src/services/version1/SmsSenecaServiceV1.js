"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class SmsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('sms');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-sms', 'controller', 'default', '*', '1.0'));
    }
}
exports.SmsSenecaServiceV1 = SmsSenecaServiceV1;
//# sourceMappingURL=SmsSenecaServiceV1.js.map