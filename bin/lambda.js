let SmsDeliveryLambdaFunction = require('../obj/src/container/SmsDeliveryLambdaFunction').SmsDeliveryLambdaFunction;

module.exports = new SmsDeliveryLambdaFunction().getHandler();