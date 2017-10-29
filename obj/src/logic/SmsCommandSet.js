"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const SmsMessageV1Schema_1 = require("../data/version1/SmsMessageV1Schema");
const SmsRecipientV1Schema_1 = require("../data/version1/SmsRecipientV1Schema");
class SmsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        this.addCommand(this.makeSendMessageCommand());
        this.addCommand(this.makeSendMessageToRecipientCommand());
        this.addCommand(this.makeSendMessageToRecipientsCommand());
    }
    makeSendMessageCommand() {
        return new pip_services_commons_node_2.Command("send_message", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('message', new SmsMessageV1Schema_1.SmsMessageV1Schema())
            .withOptionalProperty('parameters', pip_services_commons_node_5.TypeCode.Map), (correlationId, args, callback) => {
            let message = args.get("message");
            let parameters = args.get("parameters");
            this._logic.sendMessage(correlationId, message, parameters, (err) => {
                callback(err, null);
            });
        });
    }
    makeSendMessageToRecipientCommand() {
        return new pip_services_commons_node_2.Command("send_message_to_recipient", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('message', new SmsMessageV1Schema_1.SmsMessageV1Schema())
            .withRequiredProperty('recipient', new SmsRecipientV1Schema_1.SmsRecipientV1Schema())
            .withOptionalProperty('parameters', pip_services_commons_node_5.TypeCode.Map), (correlationId, args, callback) => {
            let message = args.get("message");
            let recipient = args.get("recipient");
            let parameters = args.get("parameters");
            this._logic.sendMessageToRecipient(correlationId, recipient, message, parameters, (err) => {
                callback(err, null);
            });
        });
    }
    makeSendMessageToRecipientsCommand() {
        return new pip_services_commons_node_2.Command("send_message_to_recipients", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('message', new SmsMessageV1Schema_1.SmsMessageV1Schema())
            .withRequiredProperty('recipients', new pip_services_commons_node_4.ArraySchema(new SmsRecipientV1Schema_1.SmsRecipientV1Schema()))
            .withOptionalProperty('parameters', pip_services_commons_node_5.TypeCode.Map), (correlationId, args, callback) => {
            let message = args.get("message");
            let recipients = args.get("recipients");
            let parameters = args.get("parameters");
            this._logic.sendMessageToRecipients(correlationId, recipients, message, parameters, (err) => {
                callback(err, null);
            });
        });
    }
}
exports.SmsCommandSet = SmsCommandSet;
//# sourceMappingURL=SmsCommandSet.js.map