jQuery(document).ready(function ($) {
    "use strict";
    var $ = jQuery;
    var screenRes = $(window).width(),
        screenHeight = $(window).height(),
        html = $('html');

    // IE<7 Warning
    if (html.hasClass("ie8")) {
        $("body").empty().html('Please, Update your Browser to at least IE9').css({
            'text-align': 'center',
            'font-size': '40px',
            'color': 'red',
            'margin-top': '20px'
        });
    }

    // Disable Empty Links
    $('a[href="#"]').click(function (event) {
        event.preventDefault();
    });

    // Remove outline in IE
    $("a, input, textarea").attr("hideFocus", "true").css("outline", "none");

    if ($('select[class*="select-"]').length > 0) {
        $('select[class*="select-"]').selectize({
            create: true
        });
    }

    $('select[name="archive-dropdown"], select[name="cat"], select[name="monster-widget-just-testing"], .woocommerce-ordering .orderby, .dropdown_product_cat, select.country_select, select.state_select, #calc_shipping_country, .bbpress select, .buddypress select, .give-select').selectize({
        create: true,
        allowEmptyOption: true
    });

    if ($(".input-styled, #ship-to-different-address, .inputs, .create-account, .inline, .bbp_widget_login .bbp-remember-me, .bbpress, .forgetmenot, .buddypress, .give-gateway-option, .give-donation-levels-wrap").length) {
        $(".input-styled input, #ship-to-different-address input, .inputs input[type='radio'], .inputs input[type='checkbox'], .create-account input, .inline #rememberme, .bbp-remember-me #rememberme, .bbpress input[type='radio'], .bbpress input[type='checkbox'], .forgetmenot #bp-login-widget-rememberme, .buddypress input[type='checkbox'], .buddypress input[type='radio'], .give-gateway-option input[type='radio'], .give-donation-levels-wrap input[type='radio']").customInput();
    }

    // prettyPhoto lightbox, check if <a> has atrr data-rel and hide for Mobiles
    if ($('a').is('[data-rel]') && screenRes > 600) {
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false,
            deeplinking: false,
            theme: 'dark_square',
            horizontal_padding: 60,
            show_title: false,
            default_width: 800,
            default_height: 400,
            allow_resize: true,
            overlay_gallery: false,
            markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">Next</a> \
											<a class="pp_previous" href="#">Previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											<div class="pp_social">{pp_social}</div> \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
            changepicturecallback: function () {
                var $holder = jQuery('.pp_nav .currentTextHolder'),
                    $closeButton = jQuery('.pp_close'),
                    splitted = $holder.text().split('/');
                $closeButton.addClass('fa fa-times');

                $holder.html(splitted.join('<span class="pp_text_devider">/</span>'));
                $closeButton.remove();
                $('.pp_pic_holder').prepend($closeButton);

                $closeButton.click(function () {
                    $('.pp_overlay, .pp_pic_holder').fadeOut(300, function () {
                        $(this).remove();
                    });
                    return false
                })
            }
        });
    }

    // masonry grid view
    if ($(".postlist").hasClass("postlist-grid")) {

        var $gridcontainer = $('.postlist-grid').masonry();
        $gridcontainer.masonry({
            itemSelector: '.postlist-col'
        });
    }
    if ($(".fw-portfolio").length > 0) {
        var $gridcontainer = $('.fw-portfolio-list').masonry();
        $gridcontainer.masonry({
            itemSelector: 'li'
        });
    }

    // Show more events
    $('.fw-show-more-events').on('click', function () {
        if ($(this).hasClass('closed')) {
            $(this).removeClass('closed').addClass('open');
            $('.fw-more-events-content').slideDown(800);
        }
        else {
            $(this).removeClass('open').addClass('closed');
            $('.fw-more-events-content').slideUp(800);
        }
    });

    //Iframe Serponsive
    function adjustIframes() {
        $('iframe').each(function () {
            var $this = $(this),
                proportion = $this.data('proportion'),
                w = $this.attr('width'),
                actual_w = $this.width();

            if (!proportion) {
                proportion = $this.attr('height') / w;
                $this.data('proportion', proportion);
            }

            if (actual_w != w) {
                $this.css('height', Math.round(actual_w * proportion) + 'px');
            }
        });
    }
    $(window).on('resize load', adjustIframes);

    // Detect Click in Iframe
    function detectIframeClick() {
        var overiFrame = -1;
        jQuery('.myCarousel').find('iframe').hover(function () {
            overiFrame = 1;
        }, function () {
            overiFrame = -1
        });
        $(window).on('blur', function () {
            if (overiFrame != -1) {
                jQuery('.myCarousel').carousel('pause');
            }
        });
        jQuery('.carousel-control, .carousel-indicators li').click(function () {
            jQuery('.myCarousel').carousel('cycle');
        });
    }
    detectIframeClick();

    // Smooth Scroling of ID anchors
    function filterPath(string) {
        return string
            .replace(/^\//, '')
            .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
            .replace(/\/$/, '');
    }

    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');

    function anchorFn(argument) {
        $('.anchor a[href*="#"], a[href*="#"].anchor').each(function () {
            $(this).click(function (event) {
                var thisPath = filterPath(this.pathname) || locationPath;
                if (locationPath == thisPath
                    && (location.hostname == this.hostname || !this.hostname)
                    && this.hash.replace(/#/, '')) {
                    var $target = $(this.hash), target = this.hash;
                    if (target && $target.length != 0) {
                        var targetOffset = $target.offset().top;
                        event.preventDefault();
                        $(scrollElem).animate({scrollTop: targetOffset}, 400, function () {
                            location.hash = target;
                        });
                    }
                }
            });
        });
    }
    anchorFn();

    // Scroll To Top Button
    $(window).on('scroll', function() {
        if(jQuery('.scroll-to-top').length > 0){
            if(parseInt($(window).scrollTop(), 10) > 600){
                jQuery('.scroll-to-top').fadeIn(500);
            }
            else {
                jQuery('.scroll-to-top').fadeOut(500);
            }
        }
    });

    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i < argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop() > 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop() > 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    }


    // Toggles
    $('.toggle-link').click(function () {
        $(this).parents('.toggle').removeClass('collapsed');

        if (!$(this).hasClass('collapsed')) {
            $(this).parents('.toggle').addClass('collapsed');
        }
    });

    $(".opened").find(".panel-collapse").addClass("in");
    $(".panel-toggle").click(function () {
        $(this).closest(".toggleitem").toggleClass("opened");
    });

    // pricing
    function tablePriceInit() {
        $(".fw-price-table").each(function () {
            var this_table_width = $(this).width();
            var this_table_cols = $(this).children().size();
            var this_col_width = (this_table_width / this_table_cols);

            $(this).children(".fw-price-col").css('width', this_col_width - 1);

            var table_col_height = 0;
            var this_col_row = $(this).children().find(".fw-price-row, .fw-switch-row");
            this_col_row.each(function () {
                table_col_height = table_col_height > $(this).height() ? table_col_height : $(this).height();
            });
            this_col_row.each(function () {
                $(this).height(table_col_height);
            });
        });
    }

    if ($('.fw-price-table').length) {
        tablePriceInit();

        $(window).on('resize', function () {
            tablePriceInit();
        });
    }

    // Align middle the heading title but header is absolute and if section-main-row-custom it has class: fw-content-overlay-sm, fw-content-overlay-md, fw-content-overlay-lg and fw-content-overlay-custom
    function sectionTopOverlay() {
        $('.fw-main-row-top.fw-content-vertical-align-middle .fw-row').css('display', 'block');

        // Set default padding for elements
        var section_top_inner_elements = $('.fw-main-row-top.fw-content-vertical-align-middle .fw-row:first-child div[class*="fw-col-sm-"]');
        section_top_inner_elements.css('paddingTop', '0');

        // Calculate & identify the elements
        var header_height = $('.fw-header .fw-header-main').outerHeight(),
            theme_content_density = Math.abs(parseInt($('.fw-main-row-top.fw-content-vertical-align-middle div[class*="fw-container-"]').css('paddingTop'))),
            section_top_height = $('.fw-main-row-top.fw-content-vertical-align-middle').outerHeight(),
            section_overlap_margin = Math.abs(parseInt($('.fw-content-overlay-sm, .fw-content-overlay-md, .fw-content-overlay-lg, .fw-content-overlay-custom').css('marginBottom'))),
            section_top_middle_area_center = (section_top_height - header_height - section_overlap_margin)/ 2,
            section_top_height_inner_element = $('.fw-main-row-top.fw-content-vertical-align-middle .fw-container-fluid, .fw-main-row-top.fw-content-vertical-align-middle .fw-container').height()/ 2,
            paddTop = ((header_height + section_top_middle_area_center) - section_top_height_inner_element);

        if($('.fw-main-row-top.fw-content-vertical-align-middle.fw-section-no-padding').length){
            section_top_inner_elements.css('paddingTop', paddTop);
        }
        else {
            section_top_inner_elements.css('paddingTop', (paddTop - theme_content_density));
        }
    }

    // Align middle the heading title but header is absolute
    function sectionTopAlignHeaderIsAbsolut(){
        $('.fw-main-row-top.fw-content-vertical-align-middle .fw-row').css('display', 'block');

        // Set default padding for elements
        var section_top_inner_elements = $('.fw-main-row-top.fw-content-vertical-align-middle .fw-row:first-child div[class*="fw-col-sm-"]');
        section_top_inner_elements.css('paddingTop', '0');

        // Calculate & identify the elements
        var header_height = $('.fw-header .fw-header-main').outerHeight(),
            theme_content_density = Math.abs(parseInt($('.fw-main-row-top.fw-content-vertical-align-middle div[class*="fw-container-"]').css('paddingTop'))),
            section_top_height = $('.fw-main-row-top.fw-content-vertical-align-middle').outerHeight(),
            section_top_middle_area_center = (section_top_height - header_height)/ 2,
            section_top_height_inner_element = $('.fw-main-row-top.fw-content-vertical-align-middle .fw-container-fluid, .fw-main-row-top.fw-content-vertical-align-middle .fw-container').height()/ 2,
            paddTop = ((header_height + section_top_middle_area_center) - section_top_height_inner_element);

        if($('.fw-main-row-top.fw-content-vertical-align-middle.fw-section-no-padding').length){
            section_top_inner_elements.css('paddingTop', paddTop);
        }
        else {
            section_top_inner_elements.css('paddingTop', (paddTop - theme_content_density));
        }
    }

    // Call align middle function
    var allOverlapClass = $('.fw-content-overlay-sm, .fw-content-overlay-md, .fw-content-overlay-lg, .fw-content-overlay-custom');
    if ( $('.fw-absolute-header').length && $('.fw-main-row-custom.fw-main-row-top.fw-content-vertical-align-middle').is(allOverlapClass) && screenRes > 767) {
        sectionTopOverlay();
        $(window).resize(function(){
            sectionTopOverlay();
        });
    }
    else if( ($('.fw-absolute-header').length > 0) && ($('.fw-main-row-custom.fw-main-row-top.fw-content-vertical-align-middle').length > 0 && screenRes > 767) ){
        sectionTopAlignHeaderIsAbsolut();
        $(window).resize(function(){
            sectionTopAlignHeaderIsAbsolut();
        });
    }

    // Set for revolution slider for container display block
    if ($('.rev_slider_wrapper').length > 0) {
        $('.rev_slider_wrapper').parents('.fw-container-fluid, .fw-row, .fw-container').css('display', 'block');
    }
    jQuery.fn.isOnScreen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    // Animate Things
    if( screenRes > 767){
        $(".fw-animated-element").each(function () {
            var animationElement = $(this),
                delayAnimation = parseInt(animationElement.data('animation-delay')) / 1000,
                typeAnimation = animationElement.data('animation-type'),
                isInWindow = $(window).outerHeight();

            if(animationElement.isOnScreen()) {
                if (!animationElement.hasClass("animated")) {
                    animationElement.addClass("animated").addClass(typeAnimation).trigger('animateIn');
                }
                animationElement.css({
                    '-webkit-animation-delay': delayAnimation + 's',
                    'animation-delay': delayAnimation + 's'
                });
            }
            $(window).scroll(function(){
                var top = animationElement.offset().top,
                    bottom = animationElement.outerHeight() + top,
                    scrollTop = $(this).scrollTop(),
                    top = top - screenHeight;

                if ((scrollTop > top) && (scrollTop < bottom)) {
                    if (!animationElement.hasClass("animated")) {
                        animationElement.addClass("animated").addClass(typeAnimation).trigger('animateIn');
                    }
                    animationElement.css({
                        '-webkit-animation-delay': delayAnimation + 's',
                        'animation-delay': delayAnimation + 's'
                    });
                }
            });
        });
    }else{
		$(".fw-animated-element").addClass('animated');//for mobile
	}
});

/**
 * Forms
 */
jQuery(function ($) {
    "use strict";
    var formErrorMessageClass = 'form-error',
        formErrorHideEventNamespace = '.form-error-hide',
        errorTemplate = '<p class="' + formErrorMessageClass + '" style="color: red;">{message}</p>'; // todo: customize this (add class="" instead of style="")

    function showFormError($form, inputName, message) {
        var inputSelector = '[name="' + inputName + '"]',
            $input = $form.find(inputSelector).last(),
            $message = $(errorTemplate.replace('{message}', message));

        if ($input.length) {
            $input.parent().after($message);

            $form.one('focusout' + formErrorHideEventNamespace, inputSelector, function () {
                $message.slideUp(function () {
                    $(this).remove();
                });
            });
        } else {
            // if input not found, show message in form
            $form.prepend($message);
        }
    }

    function themeGenerateFlashMessagesHtml(types) {
        var html = [], typeHtml = [];

        $.each(types, function (type, messages) {
            typeHtml = [];

            $.each(messages, function (messageId, messageData) {
                /*typeHtml.push(messageData.message);*/
                typeHtml.push(messageData);
            });

            if (typeHtml.length) {
                html.push(
                    '<ul class="flash-messages-' + type + '">' +
                    '    <li>' + typeHtml.join('</li><li>') + '</li>' +
                    '</ul>'
                );
            }
        });

        if (html.length) {
            return html.join('');
        } else {
            return '<p>Success</p>';
        }
    }

    /**
     * Display FW_Form errors
     */
    do {
        if (typeof _fw_form_invalid == 'undefined') {
            break;
        }

        var $form = $('form.fw_form_' + _fw_form_invalid.id).first();

        if (!$form.length) {
            console.error('Form not found on the page');
            break;
        }

        $.each(_fw_form_invalid.errors, function (inputName, message) {
            showFormError($form, inputName, message);
        });
    } while (false);
	
});

/**
 * Radiobox for woocommerce
 */
$(document).on("ajaxComplete", function () {
	if($.fn.customInput){
		$(".input-radio").customInput();	
	}
});

// Window load function
$(window).load(function () {
    "use strict";
    // Parallax effect function
    function parallaxFn(event) {
        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 150
        });
    }

    parallaxFn();

    // vertical align middle
    function fnResize() {
        $('.fw-content-vertical-align-middle').each(function () {
            var $this = $(this),
                heightContainerParent = $this.find('.fw-container-fluid, .fw-container').outerHeight(),
                heightParent = $this.outerHeight(),
                numberColumn = 0;
            numberColumn = parseInt($this.find('.fw-row').length);
            if (numberColumn < 2) {
                $this.find('[id^="column-"]').each(function () {
                    var $thisColum = $(this);
                    var heightColum = $thisColum.outerHeight(),
                        heightContainer = $this.find('.fw-container-fluid, .fw-container').height();
                    $thisColum.css({
                        marginTop: heightContainer / 2 - heightColum / 2
                    });
                });
                $this.css({
                    paddingTop: heightParent / 2 - heightContainerParent / 2
                }).addClass("fw-middle-align");
            } else {
                $('.fw-content-vertical-align-middle').addClass("fw-middle-align");
            }
        });
    }

    fnResize();
    $(window).resize(fnResize);
});