"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class SmsMessageV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('from', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('to', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('text', null);
    }
}
exports.SmsMessageV1Schema = SmsMessageV1Schema;
//# sourceMappingURL=SmsMessageV1Schema.js.map