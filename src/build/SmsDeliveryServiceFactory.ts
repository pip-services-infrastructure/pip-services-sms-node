import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { SmsDeliveryController } from '../logic/SmsDeliveryController';
import { SmsDeliveryHttpServiceV1 } from '../services/version1/SmsDeliveryHttpServiceV1';
import { SmsDeliverySenecaServiceV1 } from '../services/version1/SmsDeliverySenecaServiceV1'; 

export class SmsDeliveryServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-smsdelivery", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-smsdelivery", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-smsdelivery", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-smsdelivery", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SmsDeliveryServiceFactory.ControllerDescriptor, SmsDeliveryController);
		this.registerAsType(SmsDeliveryServiceFactory.SenecaServiceDescriptor, SmsDeliverySenecaServiceV1);
		this.registerAsType(SmsDeliveryServiceFactory.HttpServiceDescriptor, SmsDeliveryHttpServiceV1);
	}
	
}
