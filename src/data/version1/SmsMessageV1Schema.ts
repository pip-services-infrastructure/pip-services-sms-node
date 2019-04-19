import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class SmsMessageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('from', TypeCode.String);
        this.withOptionalProperty('to', TypeCode.String);
        this.withOptionalProperty('text', null);
    }
}
