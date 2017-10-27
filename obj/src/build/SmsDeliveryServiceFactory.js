"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const SmsDeliveryController_1 = require("../logic/SmsDeliveryController");
const SmsDeliveryHttpServiceV1_1 = require("../services/version1/SmsDeliveryHttpServiceV1");
const SmsDeliverySenecaServiceV1_1 = require("../services/version1/SmsDeliverySenecaServiceV1");
class SmsDeliveryServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SmsDeliveryServiceFactory.ControllerDescriptor, SmsDeliveryController_1.SmsDeliveryController);
        this.registerAsType(SmsDeliveryServiceFactory.SenecaServiceDescriptor, SmsDeliverySenecaServiceV1_1.SmsDeliverySenecaServiceV1);
        this.registerAsType(SmsDeliveryServiceFactory.HttpServiceDescriptor, SmsDeliveryHttpServiceV1_1.SmsDeliveryHttpServiceV1);
    }
}
SmsDeliveryServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-smsdelivery", "factory", "default", "default", "1.0");
SmsDeliveryServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-smsdelivery", "controller", "default", "*", "1.0");
SmsDeliveryServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-smsdelivery", "service", "seneca", "*", "1.0");
SmsDeliveryServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-smsdelivery", "service", "http", "*", "1.0");
exports.SmsDeliveryServiceFactory = SmsDeliveryServiceFactory;
//# sourceMappingURL=SmsDeliveryServiceFactory.js.map