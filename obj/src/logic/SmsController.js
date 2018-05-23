"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let mustache = require('mustache');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const SmsCommandSet_1 = require("./SmsCommandSet");
class SmsController {
    constructor() {
        this._credentialResolver = new pip_services_commons_node_2.CredentialResolver();
        this._logger = new pip_services_commons_node_3.CompositeLogger();
        this._opened = false;
        this._parameters = new pip_services_commons_node_1.ConfigParams();
        this._disabled = false;
        this._connectTimeout = 30000;
        this._maxPrice = 0.5;
        //private _smsType: string = 'Promotional';
        this._smsType = 'Transactional';
    }
    configure(config) {
        this._config = config.setDefaults(SmsController._defaultConfig);
        this._messageFrom = config.getAsStringWithDefault("message.from", this._messageFrom);
        this._parameters = config.getSection("parameters");
        this._connectTimeout = config.getAsIntegerWithDefault("options.connect_timeout", this._connectTimeout);
        this._maxPrice = config.getAsFloatWithDefault("options.max_price", this._maxPrice);
        this._smsType = config.getAsStringWithDefault("options.sms_type", this._smsType);
        this._logger.configure(config);
        this._credentialResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._credentialResolver.setReferences(references);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new SmsCommandSet_1.SmsCommandSet(this);
        return this._commandSet;
    }
    isOpened() {
        return this._opened;
    }
    open(correlationId, callback) {
        if (this._opened) {
            callback(null);
            return;
        }
        async.series([
            (callback) => {
                this._credentialResolver.lookup(correlationId, (err, credential) => {
                    this._credential = credential;
                    // Hack...
                    if (credential && credential.getAccessId() == null)
                        this._credential = null;
                    callback(err);
                });
            },
            (callback) => {
                // This is a hack to simplify testing
                // Todo: Redo this later
                if (this._credential) {
                    let aws = require('aws-sdk');
                    aws.config.update({
                        accessKeyId: this._credential.getAccessId(),
                        secretAccessKey: this._credential.getAccessKey(),
                        region: 'us-east-1'
                    });
                    aws.config.httpOptions = {
                        timeout: this._connectTimeout
                    };
                    this._sns = new aws.SNS();
                    this._opened = true;
                    this._logger.debug(correlationId, "Connected to AWS SNS");
                }
                callback();
            }
        ], callback);
    }
    close(correlationId, callback) {
        this._opened = null;
        callback(null);
    }
    getLanguageTemplate(value, language = 'en') {
        if (value == null)
            return value;
        if (!_.isObject(value))
            return value;
        // Set default language
        language = language || "en";
        // Get template for specified language
        let template = value[language];
        // Get template for default language
        if (template == null)
            template = value["en"];
        return "" + template;
    }
    renderTemplate(value, parameters, language = 'en') {
        let template = this.getLanguageTemplate(value, language);
        return template ? mustache.render(template, parameters) : null;
    }
    sendMessage(correlationId, message, parameters, callback) {
        // Skip processing if sms is disabled or message has no destination
        if (!this._opened || message.to == null) {
            if (callback)
                callback(null);
            return;
        }
        try {
            parameters = this._parameters.override(parameters);
            let text = this.renderTemplate(message.text, parameters);
            let params = {
                PhoneNumber: message.to,
                Message: text,
                MessageStructure: 'String',
                MessageAttributes: {
                    'AWS.SNS.SMS.SenderID': {
                        StringValue: message.from || this._messageFrom,
                        DataType: 'String'
                    },
                    'AWS.SNS.SMS.MaxPrice': {
                        StringValue: this._maxPrice.toString(),
                        DataType: 'Number'
                    },
                    'AWS.SNS.SMS.SMSType': {
                        StringValue: this._smsType,
                        DataType: 'String'
                    }
                }
            };
            this._sns.publish(params, (err, data) => {
                if (callback)
                    callback(err);
            });
        }
        catch (ex) {
            callback(ex);
        }
    }
    makeRecipientParameters(recipient, parameters) {
        parameters = this._parameters.override(parameters);
        parameters.append(recipient);
        return parameters;
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters, callback) {
        // Skip processing if sms is disabled
        if (!this._opened || recipient == null || recipient.phone == null) {
            if (callback)
                callback(null);
            return;
        }
        try {
            let recParams = this.makeRecipientParameters(recipient, parameters);
            let recLanguage = recipient.language;
            let text = this.renderTemplate(message.text, recParams, recLanguage);
            let params = {
                PhoneNumber: recipient.phone,
                Message: text,
                MessageStructure: 'String',
                MessageAttributes: {
                    'AWS.SNS.SMS.SenderID': {
                        StringValue: message.from || this._messageFrom,
                        DataType: 'String'
                    },
                    'AWS.SNS.SMS.MaxPrice': {
                        StringValue: this._maxPrice.toString(),
                        DataType: 'Number'
                    },
                    'AWS.SNS.SMS.SMSType': {
                        StringValue: this._smsType,
                        DataType: 'String'
                    }
                }
            };
            this._sns.publish(params, (err, data) => {
                if (callback)
                    callback(err);
            });
        }
        catch (ex) {
            callback(ex);
        }
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters, callback) {
        // Skip processing if sms is disabled
        if (!this._opened || recipients == null || recipients.length == 0) {
            if (callback)
                callback(null);
            return;
        }
        // Send sms separately to each user
        async.each(recipients, (recipient, callback) => {
            this.sendMessageToRecipient(correlationId, recipient, message, parameters, callback);
        }, callback);
    }
}
SmsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('message.from', null, 'options.connect_timeout', 30000, 'options.max_price', 0.5, 'options.sms_type', 'Promotional');
exports.SmsController = SmsController;
//# sourceMappingURL=SmsController.js.map