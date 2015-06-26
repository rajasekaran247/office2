'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
	Client: {
		type: String,
		default: '',
		required: 'Name',
		trim: true
	},
	JobType: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	PeriodEnded: {
		type: Date,
		trim: true
	},
	Entities: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	BranchLocation: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	JobOwner: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CurrentlyResponsible: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	TargetEndDate: {
		type: Date,
		trim: true
	},
	JobStatus: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	Priority: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	JobDetails: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	OpeningWIP: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	OpeningWIPDescription: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	AgreedFee: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	BudgetTotal: {
		type: Number,
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

mongoose.model('Job', JobSchema);
