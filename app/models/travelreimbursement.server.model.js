'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Travelreimbursement Schema
 */
var TravelreimbursementSchema = new Schema({
	entryno: {
		type: Number,
		trim: true
	},
	entrydate: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	employeename: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	partnername: {
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

mongoose.model('Travelreimbursement', TravelreimbursementSchema);
