'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Travelreimbursementdetail Schema
 */
var TravelreimbursementdetailSchema = new Schema({
	sno: {
		type: Number,
		trim: true
	},
	clientlocation: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	jobno: {
		type: Number,
		trim: true
	},
	fromdate: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	todate: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	noofdays: {
		type: Number,
		trim: true
	},
	conveyance: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	foodallowance: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	otherexpenses: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	totalamount: {
		type: Number,
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

mongoose.model('Travelreimbursementdetail', TravelreimbursementdetailSchema);
