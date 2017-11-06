let _ = require('lodash');
let async = require('async');
let mustache = require('mustache');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { CredentialParams } from 'pip-services-commons-node';
import { CredentialResolver } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { BadRequestException } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { CompositeLogger } from 'pip-services-commons-node';

import { SmsMessageV1 } from '../data/version1/SmsMessageV1';
import { SmsRecipientV1 } from '../data/version1/SmsRecipientV1';
import { ISmsController } from './ISmsController';
import { SmsCommandSet } from './SmsCommandSet';

export class SmsController implements IConfigurable, IReferenceable, ICommandable, IOpenable, ISmsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'message.from', null,

        'options.connect_timeout', 30000,
        'options.max_price', 0.5,
        'options.sms_type', 'Promotional'
    );

    private _credentialResolver: CredentialResolver = new CredentialResolver();
    private _logger: CompositeLogger = new CompositeLogger();

    private _sns: any;
    private _opened: boolean = false;
    private _credential: CredentialParams;
    
    private _config: ConfigParams;
    private _messageFrom: string;
    private _parameters: ConfigParams = new ConfigParams();
    
    private _disabled: boolean = false;
    private _connectTimeout: number = 30000;
    private _maxPrice: number = 0.5;
    private _smsType: string = 'Promotional';

    private _commandSet: SmsCommandSet;

    public configure(config: ConfigParams): void {
        this._config = config.setDefaults(SmsController._defaultConfig);

        this._messageFrom = config.getAsStringWithDefault("message.from", this._messageFrom);
        this._parameters = config.getSection("parameters");

        this._connectTimeout = config.getAsIntegerWithDefault("options.connect_timeout", this._connectTimeout);
        this._maxPrice = config.getAsFloatWithDefault("options.max_price", this._maxPrice);
        this._smsType = config.getAsStringWithDefault("options.sms_type", this._smsType);
        
        this._logger.configure(config);
        this._credentialResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._credentialResolver.setReferences(references);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new SmsCommandSet(this);
        return this._commandSet;
    }

    public isOpened(): boolean {
        return this._opened;
    }

    public open(correlationId: string, callback: (err: any) => void): void {
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

    public close(correlationId: string, callback: (err: any) => void): void {
        this._opened = null;

        callback(null);
    }
    
    private getLanguageTemplate(value: any, language: string = 'en') {
        if (value == null) return value;
        if (!_.isObject(value)) return value;

        // Set default language
        language = language || "en";

        // Get template for specified language
        let template = value[language];

        // Get template for default language
        if (template == null)
            template = value["en"];
        
        return "" + template;
    }

    private renderTemplate(value: any, parameters: ConfigParams, language: string = 'en'): string {
        let template = this.getLanguageTemplate(value, language);
        return template ? mustache.render(template, parameters) : null;
    }

    public sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void {

        // Skip processing if sms is disabled or message has no destination
        if (!this._opened || message.to == null) {
            if (callback) callback(null);
            return;
        }

        try {
            parameters = this._parameters.override(parameters);

            let text = this.renderTemplate(message.text, parameters);
            
            let params: any = {
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
                if (callback) callback(err);
            });
        } catch (ex) {
            callback(ex);
        }
    }

    private makeRecipientParameters(recipient: SmsRecipientV1, parameters: any): ConfigParams {
        parameters = this._parameters.override(parameters);
        parameters.setAsObject(recipient);
        return parameters;
    }

    public sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1,
        message: SmsMessageV1, parameters: ConfigParams, callback?: (err: any) => void) {

        // Skip processing if sms is disabled
        if (!this._opened || recipient == null || recipient.id == null) {
            if (callback) callback(null);
            return;
        }

        try {
            let recParams = this.makeRecipientParameters(recipient, parameters);
            let recLanguage = recipient.language;
            let text = this.renderTemplate(message.text, recParams, recLanguage);

            let params: any = {
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
                if (callback) callback(err);
            });
        } catch (ex) {
            callback(ex);
        }
    }

    public sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[],
        message: SmsMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void {

        // Skip processing if sms is disabled
        if (!this._opened || recipients == null || recipients.length == 0) {
            if (callback) callback(null);
            return;
        }

        // Send sms separately to each user
        async.each(recipients, (recipient, callback) => {
            this.sendMessageToRecipient(correlationId, recipient, message, parameters, callback); 
        }, callback);
    }

}
