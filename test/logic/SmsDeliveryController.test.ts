let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { SmsMessageV1 } from '../../src/data/version1/SmsMessageV1';
import { SmsRecipientV1 } from '../../src/data/version1/SmsRecipientV1';
import { SmsDeliveryController } from '../../src/logic/SmsDeliveryController';

suite('SmsDeliveryController', ()=> {
    let controller: SmsDeliveryController;

    let awsAccessId = process.env['AWS_ACCESS_ID'];
    let awsAccessKey = process.env['AWS_ACCESS_KEY'];

    let messageFrom = process.env['MESSAGE_FROM'] || "PipDevs";
    let messageTo = process.env['MESSAGE_TO'];

    if (awsAccessId == null || messageTo == null)
        return;

    suiteSetup((done) => {
        controller = new SmsDeliveryController();

        let config = ConfigParams.fromTuples(
            "message.from", messageFrom,

            "credential.access_id", awsAccessId,
            "credential.access_key", awsAccessKey
        );
        controller.configure(config);

        controller.open(null, done);
    });

    suiteTeardown((done) => {
        controller.close(null, done);
    });

    test('Send Message to Address', function (done) {
        let message =  <SmsMessageV1> {
            to: messageTo,
            text: '{{text}}'
        };

        let parameters = ConfigParams.fromTuples(
            'text', 'This is just a test'
        );

        controller.sendMessage(
            null, message, parameters,
            (err) => {
                assert.isNull(err);
                done();
            }
        );
    });

    test('Send Message to Recipient', function (done) {
        let message =  <SmsMessageV1> {
            text: 'This is just a test'
        };

        let recipient = <SmsRecipientV1> {
            id: '1',
            phone: messageTo,
            name: 'Test Recipient'
        };

        controller.sendMessageToRecipient(
            null, recipient, message, null,
            (err) => {
                assert.isNull(err);
                done();
            }
        );
    });
    
});