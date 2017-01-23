var keystone = require('keystone');
var async = require('async');

var mongoose = require('mongoose');

exports = module.exports = {
	
	ourMission: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'about';
		
		view.on('init',function(next){
			
			keystone.list('Approach').model.findOne({'_id':'572cc65e0840870552c8ce88'}).populate('users').exec(function(err,result){
				locals.approach = result;
				next(err);
			});
			
		});
		
		view.render('our-mission');
		
	},
	
	ourTeam: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'about';
		
		view.on('init', function(next) {
			
			keystone.list('Team').model.findOne({'_id':'572cc66e0840870552c8ce89'}).populate('users').exec(function(err,results){
				locals.team = results;
				next(err);
			});
			
		});
		
		view.render('our-team');
		
	},
	
	teamMemberBio: function(req, res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'about';
		
		view.on('init', function(next) {
			keystone.list('User').model
				.findOne({slug: req.params.slug })
				.exec(function(err,user){
						if (user) {
							locals.member = user;
							//ensure user is a team member and not just a normal user.
							keystone.list('Team').model
								.findOne({
									
									$and: [
										{ _id: '572cc66e0840870552c8ce89' },
										{ users: user._id }
									]
									
								})
								.exec(function(err2,results){
									
									if(err2 || !results){
										return res.status(404).render('errors/404');
									}
									next();
								});
						} else {
							res.status(404)
						}
					});
		});
		
		view.render('teammember-bio');
		
	}
	
};