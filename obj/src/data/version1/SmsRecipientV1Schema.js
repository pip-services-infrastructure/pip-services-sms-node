"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class SmsRecipientV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('phone', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('language', pip_services3_commons_node_2.TypeCode.String);
    }
}
exports.SmsRecipientV1Schema = SmsRecipientV1Schema;
//# sourceMappingURL=SmsRecipientV1Schema.js.map