let SmsDeliveryProcess = require('../obj/src/container/SmsDeliveryProcess').SmsDeliveryProcess;

try {
    new SmsDeliveryProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
