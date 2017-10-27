let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { SmsDeliveryController } from '../../src/logic/SmsDeliveryController';
import { SmsDeliveryLambdaFunction } from '../../src/container/SmsDeliveryLambdaFunction';

suite('SmsDeliveryLambdaFunction', ()=> {
    let lambda: SmsDeliveryLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'controller.descriptor', 'pip-services-smsdelivery:controller:default:default:1.0'
        );

        lambda = new SmsDeliveryLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Send message', (done) => {
        lambda.act(
            {
                role: 'sms_delivery',
                cmd: 'send_message',
                message: {
                    to: 'pipdevs@gmail.com',
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