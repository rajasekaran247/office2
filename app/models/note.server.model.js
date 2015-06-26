'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Note Schema
 */
var NoteSchema = new Schema({
	JobId: {
		type: Number,
		trim: true
	},
	Notesdate: {
		type: Date,
		trim: true
	},
	Category: {
		type: String,
		trim: true
	},
	Note: {
		type: String,
		trim: true
	},
	Remindon: {
		type: Date,
		trim: true
	},
	Reminderemailaddress: {
		type: String,
		trim: true
	},
	Repeatreminderonyear: {
		type: Number,
		trim: true
	},
	Repeatreminderonmonth: {
		type: Date,
		trim: true
	},
	Repeatreminderondays: {
		type: Date,
		trim: true
	},
	Repeatreminderendby: {
		type: String,
		trim: true
	},
	CreatedBy: {
		type: String,
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

mongoose.model('Note', NoteSchema);
