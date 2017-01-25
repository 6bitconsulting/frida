var keystone = require('keystone');

module.exports = {
	
	error: function(req, res){
		var view = new keystone.View(req, res);
		view.render('errors/500');
	},
	
	notFound: function(req,res){
		var view = new keystone.View(req, res);
		view.render('errors/404');
	}
}