"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const SmsController_1 = require("../logic/SmsController");
const SmsHttpServiceV1_1 = require("../services/version1/SmsHttpServiceV1");
class SmsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SmsServiceFactory.ControllerDescriptor, SmsController_1.SmsController);
        this.registerAsType(SmsServiceFactory.HttpServiceDescriptor, SmsHttpServiceV1_1.SmsHttpServiceV1);
    }
}
exports.SmsServiceFactory = SmsServiceFactory;
SmsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sms", "factory", "default", "default", "1.0");
SmsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sms", "controller", "default", "*", "1.0");
SmsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sms", "service", "http", "*", "1.0");
//# sourceMappingURL=SmsServiceFactory.js.map