let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { SmsController } from '../../../src/logic/SmsController';
import { SmsHttpServiceV1 } from '../../../src/services/version1/SmsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SmsHttpServiceV1', ()=> {
    let service: SmsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let controller = new SmsController();
        controller.configure(new ConfigParams());

        service = new SmsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-sms', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sms', 'service', 'http', 'default', '1.0'), service
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
        rest.post('/sms/send_message',
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