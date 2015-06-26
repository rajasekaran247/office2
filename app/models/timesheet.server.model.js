'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Timesheet Schema
 */
var TimesheetSchema = new Schema({
	SelectEntryType: {
		type: String,
		default: '',
		required: 'Billable/Non-billable/Paid Non-billable',
		trim: true
	},
	Job: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	StartTime: {
		type: Date,
		trim: true
	},
	EndTime: {
		type: Date,
		trim: true
	},
	ActivityCode: { 
		type: Number,
		trim: true
	},
	Comment: { 
		type: String,
		default: '',
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

mongoose.model('Timesheet', TimesheetSchema);
