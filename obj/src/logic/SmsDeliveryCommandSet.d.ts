import { CommandSet } from 'pip-services-commons-node';
import { ISmsDeliveryController } from './ISmsDeliveryController';
export declare class SmsDeliveryCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ISmsDeliveryController);
    private makeSendMessageCommand();
    private makeSendMessageToRecipientCommand();
    private makeSendMessageToRecipientsCommand();
}
