let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { SmsDeliveryController } from '../../../src/logic/SmsDeliveryController';
import { SmsDeliveryHttpServiceV1 } from '../../../src/services/version1/SmsDeliveryHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SmsDeliveryHttpServiceV1', ()=> {
    let service: SmsDeliveryHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let controller = new SmsDeliveryController();
        controller.configure(new ConfigParams());

        service = new SmsDeliveryHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-smsdelivery', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-smsdelivery', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

    test('Send message', (done) => {
        rest.post('/sms_delivery/send_message',
            {
                message: {
                    to: '+15202353563',
                    text: 'This is a test message'
                }
            },
            (err, req, res, result) => {
                assert.isNull(err);
                done();
            }
        );
    });
    
});