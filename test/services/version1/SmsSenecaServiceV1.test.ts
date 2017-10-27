let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { SmsDeliveryController } from '../../../src/logic/SmsDeliveryController';
import { SmsDeliverySenecaServiceV1 } from '../../../src/services/version1/SmsDeliverySenecaServiceV1';

suite('SmsDeliverySenecaServiceV1', ()=> {
    let seneca: any;
    let service: SmsDeliverySenecaServiceV1;
    let controller: SmsDeliveryController;

    suiteSetup((done) => {
        controller = new SmsDeliveryController();
        controller.configure(new ConfigParams());

        service = new SmsDeliverySenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-smsdelivery', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-smsdelivery', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    test('Send message', (done) => {
        seneca.act(
            {
                role: 'sms_delivery',
                cmd: 'send_message',
                message: {
                    to: '+15202353563',
                    text: 'This is a test message'
                }
            },
            (err, result) => {
                assert.isNull(err);
                done();
            }
        );
    });
    
});