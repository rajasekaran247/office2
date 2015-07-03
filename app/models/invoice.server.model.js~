'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Invoice Schema
 */
var InvoiceSchema = new Schema({
	invoiceno: {
		type: Number,
		trim: true
	},
	invoicedate: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	duedate: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	jobno: {
		type: Number,
		trim: true
	},
	clientname: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	mainpartner: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	jobdonefor: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	netamount: {
		type: Number,
		trim: true
	},
	totalamount: {
		type: Number,
		trim: true
	},
	amountalreadydue: {
		type: Number,
		trim: true
	},
	totalbalancedue: {
		type: Number,
		trim: true
	},
	amountinwords: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	servicetaxpr: {
		type: Number,
		trim: true
	},
	servicetaxamount: {
		type: Number,
		trim: true
	},
	educesspr: {
		type: Number,
		trim: true
	},
	educessamount: {
		type: Number,
		trim: true
	},
	seceducesspr: {
		type: Number,
		trim: true
	},
	seceducessamount: {
		type: Number,
		trim: true
	},
	remarks: {
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

mongoose.model('Invoice', InvoiceSchema);
