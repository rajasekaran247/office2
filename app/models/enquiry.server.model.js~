'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Enquiry Schema
 */
var EnquirySchema = new Schema({
	enquiryno: {
		type: Number,
		trim: true
	},
	enquirydate: {
		type: Date,
		trim: true
	},
	clientname: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	handlingresource: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	areaofenquiry: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	modeofreceipt: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	billable: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	status: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	groupaffilation: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	preparedby: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	remarks: {
		type: String,
		default: '',
		required: '',
		trim: true
	},	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Enquiry', EnquirySchema);
