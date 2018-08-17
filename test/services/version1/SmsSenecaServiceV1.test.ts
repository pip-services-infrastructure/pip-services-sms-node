let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { SmsController } from '../../../src/logic/SmsController';
import { SmsSenecaServiceV1 } from '../../../src/services/version1/SmsSenecaServiceV1';

suite('SmsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: SmsSenecaServiceV1;
    let controller: SmsController;

    suiteSetup((done) => {
        controller = new SmsController();
        controller.configure(new ConfigParams());

        service = new SmsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-sms', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sms', 'service', 'seneca', 'default', '1.0'), service
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
                role: 'sms',
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