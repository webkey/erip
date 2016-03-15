/*resize only width*/
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth != currentWidth;
	if(resizeByWidth){
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});
/*resize only width end*/

/* placeholder */
function placeholderInit(){
	$('[placeholder]').placeholder();
}
/* placeholder end */

/*sticky layout*/
function stickyLayout(){
	var $stickyJs = $(".sticky-js");
	if ($stickyJs.length) {
		$stickyJs.stick_in_parent({
			//'parent': '.wrapper'
		});
	}
}
/*sticky layout end*/

/*show form search */
function showFormSearch(){
	var searchForm = $('.search-form__header');
	if(!searchForm.length){ return; }

	var $body = $('body');
	$body.on('click', '.btn-search', function(){
		var $currentBtnOpen = $(this);
		var $currentWrap = $currentBtnOpen.closest('.header-options');
		var $searchFormContainer = $currentWrap.find('.js-search-form');

		var $searchForm = $searchFormContainer.find('form');
		if ( $searchForm.find('input:not(:submit)').val().length && $searchFormContainer.is(':visible') ){
			$searchForm.submit();
			return;
		}

		if ($currentWrap.hasClass('form-opened')){
			closeSearchForm($searchFormContainer,$('.header-options'));
			return;
		}

		$currentWrap.addClass('form-opened');
		$searchFormContainer.find('input[type="search"], input[type="text"]').trigger('focus');
	});

	$body.on('click', '.js-btn-search-close', function(){
		var $searchFormContainer = $(this).closest('.js-search-form');
		$searchFormContainer.find('input:not(:submit)').val('');

		closeSearchForm($searchFormContainer,$('.header-options'));
	});

	function closeSearchForm(form, wrapper){
		form.closest(wrapper).removeClass('form-opened')
	}
}
/*show form search end*/

/*sliders initial*/
function slidersInit(){
	/*promo-slider*/
	var sliderQuestions = $('.promo-slider');
	if(sliderQuestions.length){
		sliderQuestions.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 300,
			infinite: true,
			dots: true,
			arrows: true
		});
	}
	/*promo-slider end*/
}
/*sliders initial end*/

/*sidebar behavior*/
function sidebarBehavior(){
	var sidebar = $('.sidebar');
	if(sidebar.length){
		var timerOpen;
		var timerClose;

		sidebar.on('mouseenter', function () {
			clearTimeout(timerOpen);
			clearTimeout(timerClose);

			timerOpen = setTimeout(function () {
				$('html').addClass('expand-sidebar');
			}, 300);

		}).on('mouseleave', function () {
			clearTimeout(timerOpen);
			clearTimeout(timerClose);

			timerClose = setTimeout(function () {
				$('html').removeClass('expand-sidebar');
			}, 500);
		});

		$(document).on('click', function () {
			clearTimeout(timerOpen);
			clearTimeout(timerClose);

			$('html').removeClass('expand-sidebar');
		});

		sidebar.on('click', function (e) {
			e.stopPropagation();
		});
	}
}
/*sidebar behavior end*/

/*actions layout*/
function actionsLayout(){
	var $actions = $('.actions');

	if(!$actions.length){
		return;
	}

	$actions.masonry({
		// options
		itemSelector: '.actions__item',
		percentPosition: true
	});
}
/*actions layout end*/

/*header fixed*/
function headerFixed(){
	var page = $('body');
	if (!page.length) {
		return;
	}

	var minScrollTop = 120;

	var previousScrollTop = $(window).scrollTop();
	var desktop = device.desktop();
	$(window).on('load scroll resizeByWidth', function () {

		var currentScrollTop = $(window).scrollTop();
		var reduceLogo = $('.btn-menu').is(':hidden') && currentScrollTop > minScrollTop;

		page.toggleClass('logo-reduce', reduceLogo);
		var showHeaderPanel = currentScrollTop < minScrollTop || currentScrollTop < previousScrollTop;

		if (!desktop) {
			page.find('.header-options').toggle(showHeaderPanel);
		} else {
			page.toggleClass('top-panel-show', showHeaderPanel);
		}
		previousScrollTop = currentScrollTop;
	});
}
/*header fixed end*/

/*catalog menu scroll*/
function catalogMenuScroll(){
	var $catalogMenu = $('.catalog-menu');

	if(!$catalogMenu.length){
		return;
	}

	$(window).on('load scroll', function () {
		var catalogMenuHeight = $catalogMenu.outerHeight();
		var scrolled = $(window).scrollTop();

		if($catalogMenu.offset().top + catalogMenuHeight < scrolled){
			return;
		}

		$catalogMenu.css('top',((scrolled*0.5))+'px');
	});
}
/*catalog menu scroll end*/

/*catalog menu select*/
$.extend($.easing, {
	def: 'easeOutQuad', easeInOutExpo: function (x, t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});

function catalogMenuSelect(){
	var $navList = $('.nav-list');

	if(!$navList.length){
		return;
	}

	var currentItemId = $navList.find('.active').find('a').attr("href");

	$(currentItemId).fadeIn(0)
		.addClass('menu-active');

	var scrollSpeed = 700;

	$navList.find('a').on('click', function(event){
		event.preventDefault();

		$('.catalog-menu-list').fadeOut(0)
			.removeClass('menu-active');

		$navList.find('.active')
			.removeClass('active');

		var navID = $(this).attr("href");
		$(navID).fadeIn(0)
			.addClass('menu-active');
		$(this).closest('li').addClass('active');

		$('html, body').animate({
			scrollTop: 0
		}, scrollSpeed, "easeInOutExpo");
	});
}
/*catalog menu select end*/

/*site map switcher*/
function siteMapSwitcher(){
	var $btnMenu = $('.btn-menu');
	if(!$btnMenu.length){
		return;
	}

	var btnActiveClass = 'active';
	var siteMapShowClass = 'site-map-show';
	var $body = $('body');

	$btnMenu.on('click', function () {
		var $currentBtn = $(this);
		$currentBtn.toggleClass('active', !$currentBtn.hasClass(btnActiveClass));
		$body.toggleClass(siteMapShowClass, $currentBtn.hasClass(btnActiveClass));

		return false;
	});

	$(document).click(function () {
		closeSiteMap();
	});

	$('.js-popup-menu').on('click', function(e){
		e.stopPropagation();
	});

	$('.btn-menu-close').on('click', function(e){
		closeSiteMap();
	});

	function closeSiteMap(){
		$btnMenu.removeClass(btnActiveClass);
		$body.removeClass(siteMapShowClass);
	}
}
/*site map switcher end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	stickyLayout();
	showFormSearch();
	slidersInit();
	sidebarBehavior();
	actionsLayout();
	headerFixed();
	catalogMenuScroll();
	catalogMenuSelect();
	siteMapSwitcher();
});