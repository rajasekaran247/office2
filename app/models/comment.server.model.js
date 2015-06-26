'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	JobId: {
		type: Number,
		trim: true
	},
	Comment: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CommentedBy: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	CommentedTime: {
		type: Date,
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

mongoose.model('Comment', CommentSchema);
