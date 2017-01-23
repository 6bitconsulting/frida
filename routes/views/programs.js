var keystone = require('keystone');
var async = require('async');

exports = module.exports = {
	
	categoryView: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'programs';
		
		var cat = req.params.category;
		
		var id = false;
		switch(cat){
			case 'rise':
				id = '5735eeccba9990eb0d1790cb';
			break;
			case 'health':
				id = '5735eed7ba9990eb0d1790cc';
			break;
			case 'all':
				id = false;
			break;
			default:
				return res.redirect('/programs/all');
		}
		
		view.on('init', function(next) {
			
			var q = keystone.list('Program').model.find();
			
			if(id !== false) q.where('categories').in([id]);
			
			q.exec(function(err,results){
				locals.programs = results;
				next(err);
			});
			
		});
		
		view.render('programs-list');
		
	},
	
	singleView: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'programs';
		
		var program = req.params.program;
		
		view.on('init', function(next) {
			keystone.list('Program').model
				.findOne({slug: program}).populate('categories gallery location')
				.exec(function(err,results){
						if (results) {
							locals.program = results;
							next(err);
						} else {
							res.status(404).render('errors/404');
						}
					});
		});
		
		view.render('program-details');
		
	},
	
	calendarView: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'programs';
		
		view.on('init', function(next) {
			next();
		});
		
		view.render('calendar');
		
	},
	
	faq: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'programs';
		view.on('init', function(next) {
			
			keystone.list('FAQ').model.find({'category':'572ba265d3e227aa41103086'}).exec(function(err,results){
				locals.faqs = results;
				next(err);
			});
			
		});
		
		view.render('faq');
		
	},
	
	approach: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		locals.active = 'programs';
		
		view.on('init',function(next){
			
			keystone.list('Approach 2').model.findOne({'_id':'588636ffeb3397d611d21ed0'}).populate('users').exec(function(err,result){
				locals.approach = result;
				next(err);
			});
			
		});
		
		view.render('education-approach');
		
	},
	
};
