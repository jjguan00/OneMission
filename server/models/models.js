'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pushSchema = new Schema({
	push: {type: Boolean, required:true},
	creator: {type: String, required: true},
	_user: {type: Schema.Types.ObjectId, ref: "User", required: true},
	_mission: {type: Schema.Types.ObjectId, ref: "Mission", required: true}
}, {timestamps: true})
mongoose.model('Push', pushSchema)
var Push = mongoose.model('Push');

var replySchema = new Schema({
	content:{type: String, required:true},
	creator:{type: String, require:true},
	_user: {type: Schema.Types.ObjectId, ref: "User", required: true},
	_mission: {type: Schema.Types.ObjectId, ref: "Mission", required: true}
}, {timestamps:true})
mongoose.model('Reply', replySchema)
var Reply = mongoose.model('Reply');

var verifySchema = new Schema({
	request:{type: String, required:true},
	status:{type: Boolean},
	result:{type: String},
	creator: {type: String, required: true},
	_user: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps:true})
mongoose.model('Verify', verifySchema);
var Verify = mongoose.model('Verify');

var missionSchema = new Schema(
	{
		title: {type: String, required: true , minlength: [4, 'Too Short'], maxlength: 100},
		content: {type: String, required: true,  maxlength: 1000},
		contribution: {type: Number, min: 5},
		received: {type: Number},
		img: { data: Buffer, contentType: String },
		customer_token: {type: Object},
		creator: {type: String, required: true},
		_user: {type: Schema.Types.ObjectId, ref: "User", required: true},
		_pushs: [pushSchema],
		_replys: [replySchema]
	},
	{timestamps: true}
);
mongoose.model('Mission', missionSchema);
var Mission = mongoose.model('Mission');

var userSchema = new Schema(
	{
		email: {type: String, required: true , minlength: [4, 'Too Short'], maxlength: 30},
		name: {type: String, required: true,  maxlength: 20},
		password: {type: String, required: true, minlength:7},
		superUser: {type: Boolean, required:true},
		customer_id: {type:String},
		verified: {type: Boolean, required: true},
		verifyRequest: {type: Boolean},
		_missions: [missionSchema],
		_pushs: [pushSchema],
		_replys: [replySchema]
	},
	{timestamps: true}
);
mongoose.model('User', userSchema);
var User = mongoose.model('User');