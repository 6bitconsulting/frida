var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.hideNav = true;
	locals.navLinks = [
		{
			label: 'Frida',
			href: '#',
			children: [
				{ label: 'Approach', href: '/about/our-mission'},
				{ label: 'Our Team', href: '/about/our-team'},
			]
		},
		{
			label: 'Education',
			href: '#',
			children: [
				{ label: 'Overview', href: '/programs/overview' },
				{ label: 'Rise', href: '/programs/rise' },
				{ label: 'Health', href: '/programs/health' },
				{ label: 'Calendar', href: '/programs/calendar'},
				{ label: 'Faq', href: '/programs/faq'},
			]
		},
		{
			label: 'Immigration',
			href: '#',
			children: [
				{ label: 'Approach', href: '/immigration' },
				{ label: 'Faq', href: '/immigration/faq' },
			]
		},
		{
			label: 'Help',
			href: '/volunteer/get-involved'
		},
		{
			label: 'Contact',
			href: '/contact'
		},
		{
			label: 'Donate',
			href: '/volunteer/donate'
		}
	];
	
	view.on('init',function(next){
		keystone.list('Slider').model.find().sort('+sortOrder').exec(function(err,result){
			locals.slides = result;
			console.log(result[0]);
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Program').model.find({featured: true}).exec(function(err,result){
			locals.featuredPrograms = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Post').model.find()
		.sort('-publishedDate')
		.limit(2)
		.exec(function(err,result){
			if(result.length > 0){
				locals.posts = result;
			}
			next(err);
		});
	});
	
	// Render the view
	view.render('index');
	
};
