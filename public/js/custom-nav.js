$(function(){
	
	
	var html = $('.custom-nav').find('.nav-links').html();
	
	var t = $('.mobile-menu');
	
	t.html(html);
	
	if($('body.fw-header-sticky').length > 0) {
        $('.fw-header').clone().addClass('fw-sticky-menu').prependTo('div.site');
	};
	
	$('.mobile-toggle').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next().find('.active').removeClass('active');
		e.stopPropagation();
	});
	
	$('.mobile-menu').each(function(){
		$(this).find('li').each(function(){
			var s = $(this).find('.sub-nav');
			if(s.length > 0){
				
				$(this).find('a').eq(0).click(function(e){
					e.preventDefault();
					$(this).next().addClass('active');
					e.stopPropagation();
				});
				
				s.prepend('<li><a class="mobile-back">&larr; Go Back</a></li>');
				s.children().eq(0).children().eq(0).click(function(e){
					e.preventDefault();
					var x = $(this).parent().parent();
					console.log(x);
					x.removeClass('active');
					e.stopPropagation();
				});
			}
		});
	});
	
	if($('body.fw-header-sticky').length > 0) {
        var height_original_header = $('header.fw-header').not('header.fw-header.fw-sticky-menu').outerHeight();

		var t = null;
        $(window).on('scroll', function () {
			clearTimeout(t);
			t = setTimeout(function(){
				if(height_original_header > 300){
					var intermediate_height = height_original_header + 250;
				} else {
					var intermediate_height = 400;
				}

				// add or remove class "fw-sticky-menu-open"
				if ($(window).scrollTop() > intermediate_height) {
					// Scroll Down
					$('.fw-header.fw-sticky-menu').addClass('fw-sticky-menu-open');
				} else {
					// Scroll Up
					$('.fw-header.fw-sticky-menu').removeClass('fw-sticky-menu-open');
				}
				
				if(window.innerWidth < 768){
					$('.custom-nav').find('.active').removeClass('active');
				}
				
			},100);
        });
    }
	
	
});