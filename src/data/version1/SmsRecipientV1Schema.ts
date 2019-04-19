import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class SmsRecipientV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('name', TypeCode.String);
        this.withOptionalProperty('phone', TypeCode.String);
        this.withOptionalProperty('language', TypeCode.String);
    }
}
