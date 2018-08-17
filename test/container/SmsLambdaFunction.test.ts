let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { SmsController } from '../../src/logic/SmsController';
import { SmsLambdaFunction } from '../../src/container/SmsLambdaFunction';

suite('SmsLambdaFunction', ()=> {
    let lambda: SmsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'controller.descriptor', 'pip-services-sms:controller:default:default:1.0'
        );

        lambda = new SmsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Send message', (done) => {
        lambda.act(
            {
                role: 'sms',
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