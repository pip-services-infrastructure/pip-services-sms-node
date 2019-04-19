import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { SmsController } from '../logic/SmsController';
import { SmsHttpServiceV1 } from '../services/version1/SmsHttpServiceV1'; 

export class SmsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-sms", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-sms", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-sms", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SmsServiceFactory.ControllerDescriptor, SmsController);
		this.registerAsType(SmsServiceFactory.HttpServiceDescriptor, SmsHttpServiceV1);
	}
	
}
