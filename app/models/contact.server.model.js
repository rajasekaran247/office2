'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	Name: {
		type: String,
		default: '',
		required: 'Name',
		trim: true
	},
	Code: {
		type: Number,
		trim: true
	},
	Type: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	ContactType: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	MailingName: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	Salutation: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	TAN: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	PAN: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	TIN: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	ServiceTaxNumber: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	AssignedToPartner: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	AssignedToManager: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	AssignedToEntities: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	AssignedToBranchLocation: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	PostalAddressAddressee: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	PostalAddressAddress: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	PostalAddressCity: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	PostalAddressState: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	PostalAddressPostcode: {
		type: Number,
		trim: true
	},
	PostalAddressCountry: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CommunicationsWorkPhone: {
		type: Number,
		trim: true
	},
	CommunicationsMobile: {
		type: Number,
		trim: true
	},
	CommunicationsSkype: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CommunicationsHomePhone: {
		type: Number,
		trim: true
	},
	CommunicationsFax: {
		type: Number,
		trim: true
	},
	CommunicationsTwitter: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CommunicationsEmail: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CommunicationsLinkedIn: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CommunicationsWebsite: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	MoreAbouttheContactTaxYearEnd: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	MoreAbouttheContactClientType: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	MoreAbouttheContactClientTypeSubcategory: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	NoofEmployees: {
		type: Number,
		trim: true
	},
	Inbusinesssince: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	AnnualAccountsSchedulingAnnualAccountsMonth: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	ClientHistoryClientFrom: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	ClientHistoryClientUntil: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Contact', ContactSchema);
