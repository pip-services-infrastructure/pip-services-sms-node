import { ConfigParams } from 'pip-services-commons-node';

import { SmsMessageV1 } from '../data/version1/SmsMessageV1';
import { SmsRecipientV1 } from '../data/version1/SmsRecipientV1';

export interface ISmsDeliveryController {
    sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void;
    sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1,
        message: SmsMessageV1, parameters: ConfigParams, callback?: (err: any) => void);
    sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[],
        message: SmsMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
}
