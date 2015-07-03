'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Enquirydetail Schema
 */
var EnquirydetailSchema = new Schema({
	sno: {
		type: Number,
		trim: true
	},
	details: {
		type: String,
		default: '',
		required: '',
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

mongoose.model('Enquirydetail', EnquirydetailSchema);
