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
			'parent': '.wrapper'
		});
			//.on("sticky_kit:stick", function(e) {
			//console.log("has stuck!", e.target);
		//})
		//	.on("sticky_kit:detach", function(e) {
		//	console.log("has unstuck!", e.target);
		//});
	}
}
/*sticky layout end*/

/*show form search */
function showFormSearch() {
	var $searchForm = $('.js-search-form');
	if (!$searchForm.length) {
		return;
	}

	var $body = $('body');
	var openedFormClass = 'form-opened';

	$searchForm.on('click', '.js-search-open', function () {
		$body.toggleClass(openedFormClass, !$body.hasClass(openedFormClass));

		focusingSearchForm();
	});

	$searchForm.on('click', 'input:submit', function () {
		if(!$body.hasClass(openedFormClass)){
			$body.addClass(openedFormClass);

			focusingSearchForm();

			return false;
		}
	});

	function focusingSearchForm(){
		$searchForm.find('input[type="search"], input[type="text"]').trigger('focus');
	}
}
/*show form search end*/

/*sliders initial*/
function slidersInit(){
	/*promo-slider*/
	var sliderQuestions = $('.promo-slider');
	if(sliderQuestions.length){
		sliderQuestions.slick({
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			focusOnSelect: true,
			autoplaySpeed: 7000,
			speed: 600,
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

	var actionsSortable = $actions.masonry({
		// options
		itemSelector: '.actions__item',
		percentPosition: true
	});

	actionsSortable.on( 'layoutComplete', function( event, laidOutItems ) {
		//$(".sticky-js").trigger("sticky_kit:recalc");
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

	var shadowTpl = '<div class="catalog-menu-shadow" />';
	$(shadowTpl).insertAfter('.catalog-menu');

	$(window).on('load scroll', function () {
		var catalogMenuHeight = $catalogMenu.outerHeight();
		var scrolled = $(window).scrollTop();

		if($catalogMenu.offset().top + catalogMenuHeight < scrolled){
			return;
		}

		var scrollSize = scrolled*0.5;
		$catalogMenu.css('top', scrollSize + 'px');

		$catalogMenu.toggleClass('sliding', scrollSize != 0);

		// change opacity
		var nextElementPositionTop = $catalogMenu.next().offset().top;

		if ((nextElementPositionTop - scrolled) > 0) {
			$catalogMenu.css('opacity', (nextElementPositionTop - scrolled) / nextElementPositionTop);
		}
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

/*simple accordion*/
(function ($) {
	var SimpleAccordion = function (settings) {
		var options = $.extend({
			accordionContainer: null,
			accordionItem: null,
			accordionHeader: 'h3',
			active: '0',
			animateSpeed: 300
		}, settings || {});

		this.options = options;
		var container = $(options.accordionContainer);
		this.$accordionContainer = container;
		this.$accordionItem = $(options.accordionItem, container);
		this.$accordionHeader = $(options.accordionHeader, container);
		this.$accordionPanel = $(this.$accordionHeader.next());
		this._active = options.active;
		this._animateSpeed = options.animateSpeed;

		this.modifiers = {
			active: 'active',
			current: 'current'
		};

		this.bindEvents();
		this.beforeStart();
	};

	SimpleAccordion.prototype.beforeStart = function () {

	};

	SimpleAccordion.prototype.bindEvents = function () {
		var self = this,
				_modifiersActive = this.modifiers.active;

		self.$accordionItem.on('click', function (e) {
			e.preventDefault();

			var current = $(this);

			if(current.hasClass(_modifiersActive)){
				current.find(self.$accordionHeader).css({
					'height': 24
				});

				current.find(self.$accordionPanel).css({
					'height': 24
				});

				current.removeClass(_modifiersActive);
				return;
			}

			self.$accordionHeader.css({
				'height': 24
			});

			self.$accordionPanel.css({
				'height': 24
			});

			self.$accordionItem.removeClass(_modifiersActive);

			current.find(self.$accordionHeader).css({
				'height':'auto'
			});

			current.find(self.$accordionPanel).css({
				'height':'auto'
			});

			current.addClass(_modifiersActive);
		})
	};

	SimpleAccordion.prototype.scrollPosition = function (scrollElement) {
		$('html, body').animate({ scrollTop: scrollElement.offset().top }, this._animateSpeed);
	};

	window.SimpleAccordion = SimpleAccordion;
}(jQuery));

function faqBehavior() {
	if($('.faq-list').length){
		new SimpleAccordion({
			accordionContainer: '.faq-list',
			accordionItem: '.faq-item',
			animateSpeed: 300
		});
	}
}
/*simple accordion end*/

/*equalHeight*/
function equalHeightInit(){
	var bonusesList = $('.advantages');
	bonusesList.find('h3').equalHeight({
		//amount: 3,
		useParent: true,
		parent: bonusesList,
		resize: true
	});
	bonusesList.find('p').equalHeight({
		//amount: 3,
		useParent: true,
		parent: bonusesList,
		resize: true
	});
}
/*equalHeight end*/

/* tabs */
function tabs() {
	var $helpfulTabs = $('.helpful');
	if (!$helpfulTabs) { return; }

	$helpfulTabs.responsiveTabs({
		active: 0,
		rotate: false,
		startCollapsed: 'accordion',
		collapsible: 'accordion',
		setHash: false,
		animation: 'fade', // slide
		duration: 300, // default 500
		animationQueue: true
		//scrollToAccordion: true,
		//scrollToAccordionOffset: true,
		//activate: function(e, tab) {
		//	console.log(tab);
		//},
		//activateState: function(e, state) {
		//	console.log(state);
		//}
	});
}
/* tabs end */


/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	//stickyLayout();
	showFormSearch();
	slidersInit();
	sidebarBehavior();
	actionsLayout();
	headerFixed();
	catalogMenuScroll();
	catalogMenuSelect();
	siteMapSwitcher();
	faqBehavior();
	tabs();
});

$(window).load(function () {
	equalHeightInit();
});