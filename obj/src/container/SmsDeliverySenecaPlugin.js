"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const SmsDeliveryController_1 = require("../logic/SmsDeliveryController");
const SmsDeliverySenecaServiceV1_1 = require("../services/version1/SmsDeliverySenecaServiceV1");
class SmsDeliverySenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-smsdelivery', seneca, SmsDeliverySenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new SmsDeliveryController_1.SmsDeliveryController();
        controller.configure(pip_services_commons_node_3.ConfigParams.fromValue(options));
        let service = new SmsDeliverySenecaServiceV1_1.SmsDeliverySenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-smsdelivery', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-smsdelivery', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.SmsDeliverySenecaPlugin = SmsDeliverySenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new SmsDeliverySenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=SmsDeliverySenecaPlugin.js.map