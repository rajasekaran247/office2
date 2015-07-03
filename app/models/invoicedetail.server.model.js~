'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Invoicedetail Schema
 */
var InvoicedetailSchema = new Schema({
	sno: {
		type: Number,
		trim: true
	},
	particulars: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	amount: {
		type: Number,
		trim: true	
	},
	notes: {
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

mongoose.model('Invoicedetail', InvoicedetailSchema);
