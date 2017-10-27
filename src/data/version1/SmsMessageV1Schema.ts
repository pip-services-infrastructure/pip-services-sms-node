import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class SmsMessageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('from', TypeCode.String);
        this.withOptionalProperty('to', TypeCode.String);
        this.withOptionalProperty('text', null);
    }
}
