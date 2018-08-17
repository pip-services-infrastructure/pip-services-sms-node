import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { SmsController } from '../logic/SmsController';
import { SmsHttpServiceV1 } from '../services/version1/SmsHttpServiceV1';
import { SmsSenecaServiceV1 } from '../services/version1/SmsSenecaServiceV1'; 

export class SmsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-sms", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-sms", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-sms", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-sms", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SmsServiceFactory.ControllerDescriptor, SmsController);
		this.registerAsType(SmsServiceFactory.SenecaServiceDescriptor, SmsSenecaServiceV1);
		this.registerAsType(SmsServiceFactory.HttpServiceDescriptor, SmsHttpServiceV1);
	}
	
}
