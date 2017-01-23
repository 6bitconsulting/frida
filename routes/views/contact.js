var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.active = 'contact';
	locals.refTypes = Enquiry.fields.referralSource.ops;
	locals.perTypes = Enquiry.fields.personType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.gmaps_api_key = process.env.GMAPS_API_KEY;
	
	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function(next) {
		
		var newEnquiry = new Enquiry.model(),
			updater = newEnquiry.getUpdateHandler(req);
		
		updater.process( req.body, {
			flashErrors: true,
			fields: 'name, email, referralSource, personType, message',
			errorMessage: 'There was a problem submitting your enquiry:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
				locals.formData = {}; //empty
			}
			next();
		});
		
	});
	
	view.render('contact');
	
};
