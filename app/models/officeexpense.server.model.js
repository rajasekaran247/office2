'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Officeexpense Schema
 */
var OfficeexpenseSchema = new Schema({
	entryno: {
		type: Number,
		trim: true
	},
	date: {
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
	sno: {
		type: Number,
		trim: true
  	},
	description: {
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

mongoose.model('Officeexpense', OfficeexpenseSchema);
