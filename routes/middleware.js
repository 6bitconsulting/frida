/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var keystone = require('keystone');
var _ = require('underscore');
var moment = require('moment');
var numeral = require('numeral');
var utils = require('keystone-utils');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	keystone.list('Program Category').model.find().exec(function(err,programs){
		
		var edu_children = [
			{ label: 'Overview', href: '/programs/overview' }
		];
		
		for(var i=0;i<programs.length;i++){
			
			if(!programs[i].slug){
				programs[i].slug = 'unset';
			}
			
			edu_children.push({ label: programs[i].name, href: '/programs/'+programs[i].slug });
		}
		
		edu_children.push({ label: 'Calendar', href: '/programs/calendar'});
		edu_children.push({ label: 'Faq', href: '/programs/faq'});
		
		locals.navLinks = [
			{
				label: 'Frida',
				href: '#',
				children: [
					{ label: 'Approach', href: '/about/our-mission'},
					{ label: 'Our Team', href: '/about/our-team'},
				],
				active: 'about'
			},
			{
				label: 'Education',
				href: '#',
				children: edu_children,
				active: 'programs'
			},
			{
				label: 'Immigration',
				href: '#',
				children: [
					{ label: 'Approach', href: '/immigration' },
					{ label: 'Faq', href: '/immigration/faq' },
				],
				active: 'immigration'
			},
			{
				label: 'Blog',
				href: '/blog',
				active: 'blog'
			},
			{
				label: 'Moments',
				href: '/moments',
				active: 'gallery'
			},
			{
				label: 'Contact',
				href: '/contact',
				active: 'contact'
			},
			{
				label: 'Get Involved',
				href: '/volunteer/get-involved',
				active: 'volunteer'
			},
			{
				label: 'Donate',
				href: '/volunteer/donate',
				active: 'donate'
			}
		];
		
		locals.user = req.user;
		
		locals.year = ''+(new Date()).getFullYear();
		
		next();	
	});
	
	
	
};

exports.adminLocals = function(req,res,next){
	
	var flashMessages = {
		info: res.req.flash('info'),
		success: res.req.flash('success'),
		warning: res.req.flash('warning'),
		error: res.req.flash('error'),
		hilight: res.req.flash('hilight')
	};
	
	var permLocals = {
		_: _,
		moment: moment,
		numeral: numeral,
		env: keystone.get('env'),
		brand: keystone.get('brand'),
		appversion : keystone.get('appversion'),
		nav: keystone.nav,
		messages: _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false,
		lists: keystone.lists,
		js: 'javascript:;',// eslint-disable-line no-script-url
		utils: utils,
		User: keystone.lists[keystone.get('user model')],
		user: req.user,
		title: 'Keystone',
		signout: keystone.get('signout url'),
		backUrl: keystone.get('back url') || '/',
		section: {},
		version: keystone.version,
		csrf_header_key: keystone.security.csrf.CSRF_HEADER_KEY,
		csrf_token_key: keystone.security.csrf.TOKEN_KEY,
		csrf_token_value: keystone.security.csrf.getToken(req, res),
		csrf_query: '&' + keystone.security.csrf.TOKEN_KEY + '=' + keystone.security.csrf.getToken(req, res),
	};
	
	res.locals = _.extend(res.locals,permLocals);
	
	keystone.list('Conversation').model.find({ unseen: req.user._id }).count().exec(function(err,results){
		res.locals.newMsgCount = results;
		next();
	});
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		// console.log(req.user);
		next();
	}
	
};
