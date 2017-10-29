"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const SmsController_1 = require("../logic/SmsController");
const SmsHttpServiceV1_1 = require("../services/version1/SmsHttpServiceV1");
const SmsSenecaServiceV1_1 = require("../services/version1/SmsSenecaServiceV1");
class SmsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SmsServiceFactory.ControllerDescriptor, SmsController_1.SmsController);
        this.registerAsType(SmsServiceFactory.SenecaServiceDescriptor, SmsSenecaServiceV1_1.SmsSenecaServiceV1);
        this.registerAsType(SmsServiceFactory.HttpServiceDescriptor, SmsHttpServiceV1_1.SmsHttpServiceV1);
    }
}
SmsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-sms", "factory", "default", "default", "1.0");
SmsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sms", "controller", "default", "*", "1.0");
SmsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sms", "service", "seneca", "*", "1.0");
SmsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sms", "service", "http", "*", "1.0");
exports.SmsServiceFactory = SmsServiceFactory;
//# sourceMappingURL=SmsServiceFactory.js.map