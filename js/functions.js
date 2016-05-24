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

/*device detected*/
var DESKTOP = device.desktop();
//console.log('DESKTOP: ', DESKTOP);
var MOBILE = device.mobile();
//console.log('MOBILE: ', MOBILE);
var TABLET = device.tablet();
//console.log('MOBILE: ', MOBILE);
/*device detected end*/

/*parallax on mousemove*/
(function () {
	var ParallaxJs = function (setting){
		var options = $.extend({
			parallaxElement: null,
			parallaxArea: null
		}, setting || {});

		this.parallaxElement = document.querySelector(options.parallaxElement);
		this.parallaxArea = document.querySelector(options.parallaxArea);
		this.win = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		this.bindEvents();
	};

	// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
	ParallaxJs.prototype.throttle = function(fn, delay) {
		var allowSample = true;

		return function(e) {
			if (allowSample) {
				allowSample = false;
				setTimeout(function() { allowSample = true; }, delay);
				fn(e);
			}
		};
	};

	ParallaxJs.prototype.bindEvents = function () {
		var self = this;
		var parallaxElement = self.parallaxElement;
		var win = self.win;
		var area = self.parallaxArea;

		//parallaxElement.style.WebkitTransition = '-webkit-transform 0.4s';
		//parallaxElement.style.transition = 'transform 0.4s';

		area.addEventListener('mousemove', self.throttle(function(ev) {
			var offsetLeftArea = area.getBoundingClientRect().left;
			var transX = - (ev.clientX - offsetLeftArea - area.offsetWidth / 2) / 20;
			//var transX = 50/(win.width) * ev.clientX - 0;
			//xVal = -1/(win.height/2)*ev.clientY + 1,
			//yVal = 1/(win.width/2)*ev.clientX - 1,
			//transY = 20/(win.height)*ev.clientY - 10,
			//transZ = 100/(win.height)*ev.clientY - 50;

			parallaxElement.style.WebkitTransform = 'translateX(' + transX + 'px)';
			parallaxElement.style.transform = 'translateX(' + transX + 'px)';
			//parallaxElement.style.WebkitTransform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
			//parallaxElement.style.transform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
		}, 100));
	};

	window.ParallaxJs = ParallaxJs;
}());

function bgParallaxOnMousemove() {
	var navBarBg = document.querySelector('.nav-bar-bg');
	if (navBarBg) {
		new ParallaxJs({
			parallaxElement: '.nav-bar-bg',
			parallaxArea: '.nav-bar'
		});
	}

	var easyBg = document.querySelector('.easy-bg');
	if (easyBg) {
		new ParallaxJs({
			parallaxElement: '.easy-bg',
			parallaxArea: '.easy'
		});
	}
}
/*parallax on mousemove end*/

/*parallax on scroll*/
function bgParallaxOnScroll(){
	if(DESKTOP){
		skrollr.init({
			forceHeight: false
		});
	}
}
/*parallax on scroll end*/

/* placeholder */
function placeholderInit(){
	$('[placeholder]').placeholder();
}
/* placeholder end */

/*sticky layout*/
function stickyLayout(){
	var $stickyJs = $(".sticky-js");
	if ($stickyJs.length) {
		var resizeTimer;

		$(window).on('load resize accordionEvent', function () {
			$stickyJs.trigger("sticky_kit:detach").attr('style','');

			if($(window).width() < 1350){
				$stickyJs.trigger("sticky_kit:detach").attr('style','');
				return;
			}

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				$stickyJs.stick_in_parent({ // sticky element do not have relative
					parent: '.wrapper', // parent must have relative
					bottoming: false
				});
			}, 200);
		});
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
	/*pic-slider*/
	var $picSlider = $('.pic-slider');
	if($picSlider.length){
		$picSlider.on('init', function () {
			$(this).css({'visibility':'visible'});
		}).slick({
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			focusOnSelect: true,
			autoplaySpeed: 7000,
			speed: 600,
			infinite: true,
			dots: true,
			arrows: true,
			adaptiveHeight: true
		});
	}
	/*pic-slider end*/

	/*promo-slider*/
	var $promoSlider = $('.promo-slider');
	if($promoSlider.length){
		$promoSlider.slick({
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			focusOnSelect: true,
			autoplay: true,
			autoplaySpeed: 7000,
			speed: 600,
			infinite: true,
			dots: true,
			arrows: true
		});

		$('input[type=text]').focus(function () {
			// console.log('in');
			$promoSlider.slick("slickSetOption", "draggable", false, false);
			$promoSlider.slick("slickSetOption", "autoplay", false, false);
		}).blur(function () {
			// console.log('out');
			$promoSlider.slick("slickSetOption", "draggable", true, false);
			$promoSlider.slick("slickSetOption", "autoplay", true, false);
		});
	}
	/*promo-slider end*/
}
/*sliders initial end*/

/*sidebar behavior*/
function sidebarBehavior(){
	var $sidebar = $('.sidebar');
	if($sidebar.length){
		$(window).on('load', function () {
			$('.sidebar-small').clone().prependTo($sidebar.find('.sidebar-holder')).removeClass('sidebar-small').addClass('sidebar-large');

			var $html = $('html');
			// var $sidebarLayout = $('.sidebar-layout');
			var _activeClass = 'expanded-sidebar';
			var delay = 350;
			var animateSpeed = 300;
			var timerClose;
			var timerOpen;
			var $sidebarOverlay = $('<div class="sidebar-overlay">');

			function createSidebarOverlay(flagClose) {
				if(flagClose == "close"){
					$sidebarOverlay.stop().fadeOut(animateSpeed, function () {
						$sidebarOverlay.remove();
					})
				} else if($sidebarOverlay.is(':hidden')) {
					$sidebarOverlay
						.insertBefore($sidebar)
						.stop().fadeOut(0, function () {
						$sidebarOverlay.fadeIn(animateSpeed);
					});
				}
			}

			if (DESKTOP) {
				$sidebar.on('mouseenter', function () {

					clearTimeout(timerClose);
					clearTimeout(timerOpen);

					timerOpen = setTimeout(function () {
						$html.addClass(_activeClass);

						createSidebarOverlay();
					}, delay);

				}).on('mouseleave', function () {
					clearTimeout(timerClose);
					clearTimeout(timerOpen);

					timerClose = setTimeout(function () {
						$html.removeClass(_activeClass);

						createSidebarOverlay('close');
					}, delay);
				});
			}

			if(!DESKTOP){
				$sidebar.on('click', function (e) {
					//e.preventDefault();

					clearTimeout(timerClose);
					clearTimeout(timerOpen);

					$html.addClass(_activeClass);
					if($sidebarOverlay.is(':hidden')){
						createSidebarOverlay();
					}
				});
			}

			$('.btn-sidebar').on('click', function (e) {
				e.preventDefault();

				clearTimeout(timerClose);
				clearTimeout(timerOpen);

				if($html.hasClass(_activeClass)){
					$html.removeClass(_activeClass);
					createSidebarOverlay('close');
				} else {
					$html.addClass(_activeClass);

					createSidebarOverlay();
				}

				e.stopPropagation();
			});

			$(document).on('click', function () {
				clearTimeout(timerClose);
				clearTimeout(timerOpen);

				$html.removeClass(_activeClass);
				createSidebarOverlay('close');
			});

			$sidebar.on('click', function (e) {
				e.stopPropagation();
			});
		});
	}
}
/*sidebar behavior end*/

/*header fixed*/
function headerFixed(){
	var page = $('body');
	if (!page.length) {
		return;
	}

	var minScrollTop = 120;

	var previousScrollTop = $(window).scrollTop();

	$(window).on('load scroll resizeByWidth', function () {

		var currentScrollTop = $(window).scrollTop();

		var showHeaderPanel = currentScrollTop < minScrollTop || currentScrollTop < previousScrollTop;

		if (!DESKTOP) {
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
		//$catalogMenu.css('top', scrollSize + 'px');
		$catalogMenu.css({
			WebkitTransform: 'translateY(' + scrollSize + 'px)',
			transform: 'translateY(' + scrollSize + 'px)'
		});

		$catalogMenu.toggleClass('sliding', scrollSize != 0);

		// change opacity
		var nextElementPositionTop = $catalogMenu.next().offset().top;

		if ((nextElementPositionTop - scrolled) > 0) {
			$catalogMenu.css('opacity', (nextElementPositionTop - scrolled) / (nextElementPositionTop));
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

	var $catalogMenu = $('.catalog-menu');
	$(window).load(function () {
		$catalogMenu.css('height','auto');
	});
	var scrollSpeed = 900;
	var animationSpeed = 500;

	$navList.find('a').on('click', function(event){
		event.preventDefault();

		$('body').removeClass('nav-show');
		$('.btn-menu').removeClass('active');

		$('.catalog-menu-list')
			.removeClass('menu-active')
			.stop()
			.animate({
				opacity: 'hide'
			}, animationSpeed);

		$catalogMenu
			.stop()
			.animate({
			height: 0
		}, animationSpeed);

		$navList.find('li')
			.removeClass('active');

		var $currentItem = $(this);
		var navID = $currentItem.attr("href");

		if($(navID).is(':hidden')){
			$(navID)
				.closest($catalogMenu)
				.stop()
				.animate({
					height: $(navID).outerHeight()
				}, animationSpeed);

			$(navID)
				.addClass('menu-active')
				.stop()
				.animate({
					opacity: 'toggle'
				}, animationSpeed);

			$currentItem.closest('li').addClass('active');
		}

		// sticky_kit recalculation
		$(document.body).trigger("sticky_kit:recalc");

		// scroll to top
		var $htmlAndBody = $('html, body');
		if ($(window).scrollTop() > 0 && !$htmlAndBody.is(':animated')) {
			$htmlAndBody.stop().animate({
				scrollTop: 0
			}, scrollSpeed, "easeInOutExpo");
		}
	});


	/*main nav menu switch*/
	var $btnMenu = $('.btn-menu');

	var btnActiveClass = 'active';
	var siteMapShowClass = 'nav-show';
	var $body = $('body');

	$btnMenu.on('click', function (e) {
		e.preventDefault();

		var $currentBtn = $(this);
		$currentBtn.toggleClass(btnActiveClass, !$currentBtn.hasClass(btnActiveClass));
		$body.toggleClass(siteMapShowClass, $currentBtn.hasClass(btnActiveClass));

		maxHeightMainNav.call();

		return false;
	});

	$(document).click(function () {
		closeSiteMap();
	});

	$navList.on('click', function(e){
		e.stopPropagation();
	});

	$('.btn-menu-close').on('click', function(e){
		closeSiteMap();
	});

	function closeSiteMap(){
		$btnMenu.removeClass(btnActiveClass);
		$body.removeClass(siteMapShowClass);
	}

	/*max height of navigation*/
	$(window).on('resize scroll', function () {
		maxHeightMainNav.call();
	});

	function maxHeightMainNav() {
		var topSpace = $('body').hasClass('top-panel-show') ? 60 : 0;
		var windowHeight = $(window).height() - topSpace;

		$navList.css('max-height', windowHeight);
	}
}
/*catalog menu select end*/

/*site map switcher*/
function siteMapSwitcher(){
	var $btnSiteMap = $('.btn-site-map');
	if(!$btnSiteMap.length){
		return;
	}

	var btnActiveClass = 'active';
	var siteMapShowClass = 'site-map-show';
	var $body = $('body');

	$btnSiteMap.on('click', function (e) {
		e.preventDefault();

		var $currentBtn = $(this);
		$currentBtn.toggleClass(btnActiveClass, !$currentBtn.hasClass(btnActiveClass));
		$body.toggleClass(siteMapShowClass, $currentBtn.hasClass(btnActiveClass));

		return false;
	});

	$(document).click(function () {
		closeSiteMap();
	});

	$('.js-popup-menu').on('click', function(e){
		e.stopPropagation();
	});

	$('.btn-site-map-close').on('click', function(e){
		closeSiteMap();
	});

	function closeSiteMap(){
		$btnSiteMap.removeClass(btnActiveClass);
		$body.removeClass(siteMapShowClass);
	}
}
/*site map switcher end*/

/*actions layout*/
function actionsLayout(){
	var $actions = $('.actions');
	if(!$actions.length){
		return;
	}
	// flag
	var isActive = false;

	$(window).on('load resize', function () {
		if($(window).outerWidth() < 1350){
			if (isActive) {
				$('.actions').masonry('destroy');
				// set flag
				isActive = !isActive;
			}
		} else {
			var actionsSortable = $actions.masonry({
				itemSelector: '.actions__item',
				percentPosition: true
			});

			// set flag
			isActive = true;

			actionsSortable.on( 'layoutComplete', function() {
				$(document.body).trigger("sticky_kit:recalc");
			});
		}
	})
}
/*actions layout end*/

/*aside panel switcher*/
function asidePanelSwitcher(){
	var $btnSiteMap = $('.btn-aside');
	if(!$btnSiteMap.length){
		return;
	}

	var $body = $('body');
	var $asidePanelOverlay = $('<div class="aside-panel-overlay">');
	var siteMapShowClass = 'aside-panel-show';
	var btnActiveClass = 'active';
	var animateSpeed = 200;

	$btnSiteMap.on('click', function (e) {
		e.preventDefault();

		var $currentBtn = $(this);

		if($currentBtn.hasClass(btnActiveClass)){
			closeSiteMap();
			return;
		}

		$currentBtn.toggleClass(btnActiveClass, !$currentBtn.hasClass(btnActiveClass));
		$body.toggleClass(siteMapShowClass, $currentBtn.hasClass(btnActiveClass));

		$asidePanelOverlay
				.insertBefore($('.aside'))
				.stop().fadeOut(0, function () {
					$asidePanelOverlay.fadeIn(animateSpeed);
				});

		e.stopPropagation();
	});

	$(document).click(function () {
		closeSiteMap();
	});

	$('.aside').on('click', function(e){
		e.stopPropagation();
	});

	$('.aside-panel-close').on('click', function(e){
		closeSiteMap();
	});

	function closeSiteMap(){
		$btnSiteMap.removeClass(btnActiveClass);
		$body.removeClass(siteMapShowClass);
		$asidePanelOverlay.stop().fadeOut(animateSpeed, function () {
			$asidePanelOverlay.remove();
		})
	}
}
/*aside panel switcher end*/

/*faq behavior*/
(function ($) {
	var FaqBehavior = function (settings) {
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
	};

	FaqBehavior.prototype.bindEvents = function () {
		var self = this;
		var $itemPanel = self.$accordionPanel;
		var _modifiersActive = self.modifiers.active;
		var _duration = self._animateSpeed;

		self.$accordionItem.on('click', function () {
			var $currentItem = $(this).closest(self.$accordionItem);
			var $currentItemPanel = $currentItem.find($itemPanel);

			if($itemPanel.is(':animated')){
				return;
			}

			if($currentItemPanel.is(':visible')){
				self.closeAccordionPanels();
				return;
			}

			self.closeAccordionPanels();

			$currentItemPanel.slideToggle(_duration);
			$currentItem.toggleClass(_modifiersActive);

			return false;
		});

		$(document).click(function () {
			self.closeAccordionPanels();
		});

		$itemPanel.on('click', function(e){
			e.stopPropagation();
		});
	};

	FaqBehavior.prototype.closeAccordionPanels = function () {
		var self = this;
		self.$accordionPanel.slideUp(self._animateSpeed);
		self.$accordionItem.removeClass(self.modifiers.active);
	};

	FaqBehavior.prototype.scrollPosition = function (scrollElement) {
		$('html, body').animate({ scrollTop: scrollElement.offset().top }, this._animateSpeed);
	};

	window.FaqBehavior = FaqBehavior;
}(jQuery));

function faqBehaviorInit() {
	if($('.faq-list').length){
		new FaqBehavior({
			accordionContainer: '.faq-list',
			accordionItem: '.faq-item',
			animateSpeed: 300
		});
	}
}
/*faq behavior end*/

/*terminals switcher*/
function terminalsSwitcherInit(){
	var $terminalItem = $('.terminals-item');
	if(!$terminalItem.length){
		return;
	}

	var $terminalItemDrop = $terminalItem.find('.terminals-item__drop');
	var _activeClass = 'active';
	var _duration = 400;
	var flag = true;

	$terminalItem.on('click', 'h3', function () {
		var $currentItem = $(this).closest('.terminals-item');
		var $currentItemDrop = $currentItem.find($terminalItemDrop);

		if($terminalItemDrop.is(':animated')){
			return false;
		}

		if($currentItem.hasClass(_activeClass)){
			flag = false;
		}

		closeTerminalsDrop();

		$currentItemDrop.stop().slideToggle(_duration);
		$currentItem.toggleClass(_activeClass, flag);

		flag = true;
		return false;
	});

	$(document).click(function () {
		closeTerminalsDrop();
	});

	$terminalItemDrop.on('click', function(e){
		e.stopPropagation();
	});

	function closeTerminalsDrop(){
		$terminalItemDrop.stop().slideUp(_duration);
		$terminalItem.removeClass(_activeClass);
	}
}
/*terminals switcher end*/

/*equalHeight*/
function equalHeightInit(){
	/*advantages*/
	var $bonusesList = $('.advantages');
	if ($bonusesList.length) {
		$bonusesList.find('h3').equalHeight({
			//amount: 3,
			useParent: true, parent: $bonusesList, resize: true
		});
		$bonusesList.find('p').equalHeight({
			//amount: 3,
			useParent: true, parent: $bonusesList, resize: true
		});
	}

	/*movie*/
	var $movie = $('.movie');
	if ($movie.length) {
		$movie.find('h3').equalHeight({
			//amount: 3,
			useParent: true, parent: $movie, resize: true
		});
		$movie.find('.movie__text').equalHeight({
			//amount: 3,
			useParent: true, parent: $movie, resize: true
		});
	}

	/*files*/
	var $files = $('.files');
	if ($files.length) {
		$files.find('.file').equalHeight({
			//amount: 3,
			useParent: true, parent: $files, resize: true
		});
	}
}
/*equalHeight end*/

/* tabs */
function refreshSelectInTabs(select) {
	$.each(select, function (i, el) {
		var checked = $(el).multiselect('getChecked');
		var flag = true;
		if (!checked.length) {
			flag = false
		}
		if (!flag) {
			$(el).multiselect('uncheckAll');
			$(el)
				.multiselect('widget')
				.find('.ui-state-active')
				.removeClass('ui-state-active')
				.find('input')
				.removeAttr('checked');
		}
		$(el).multiselect('close');
	});
}

function tabs() {
	var $helpfulTabs = $('.helpful');
	if ($helpfulTabs) {
		$helpfulTabs.responsiveTabs({
			active: 0,
			rotate: false,
			startCollapsed: 'accordion',
			collapsible: 'accordion',
			setHash: false,
			animation: 'fade', // slide
			duration: 300, // default 500
			animationQueue: true,
			scrollToAccordion: true,
			//scrollToAccordionOffset: true
			activate: function() {
				var select = $(this).find('select');

				if (DESKTOP && select.length) {
					refreshSelectInTabs(select);
				}
			}
			//activateState: function(e, state) {
			//	console.log(state);
			//}
		});
	}

	var $callbackTabs = $('.callback');
	if ($callbackTabs) {
		$callbackTabs.responsiveTabs({
			active: 0,
			rotate: false,
			startCollapsed: 'accordion',
			collapsible: 'accordion',
			setHash: false,
			animation: 'fade', // slide
			duration: 300, // default 500
			animationQueue: true,
			scrollToAccordion: true,
			//scrollToAccordionOffset: true
			activate: function() {
				var select = $(this).find('select');

				if (DESKTOP && select.length) {
					refreshSelectInTabs(select);
				}
			}
			// activateState: function(e, state) {
			//
			// }
		});
	}
}
/* tabs end */

/*map init*/
var smallPinMap = 'img/map-pin-sm.png';
		//largePinMap = 'img/map-pin.png';

var localObjects = [
	[
		{lat: 53.8750, lng: 27.4982}, //coordinates of marker
		{latBias: 0.0020, lngBias: 0}, //bias coordinates for center map
		smallPinMap, //image pin
		12,
		{
			title: 'ОАО "Беларусбанк"',
			type: '<b>Тип устройства:</b> <span>РКЦ</span>',
			address: '<b>Адрес:</b> <span>Уманская, 54</span>',
			phone: '<b>Тел.:</b> <span>+375 17 341-26-54</span>',
			works: '<b>Режим работы:</b> <div><span>Пн-Пт:</span> 9<sup>00</sup> – 19<sup>00</sup></div> <div><span>Сб:</span> 10<sup>00</sup> – 14<sup>00</sup></div>'
		}
	],[
		{lat: 53.8672, lng: 27.4836},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		12,
		{
			title: 'ОАО "Беларусбанк"',
			type: '<b>Тип устройства:</b> <span>РКЦ</span>',
			address: '<b>Адрес:</b> <span>Пр-т газеты "Правда", 20</span>',
			phone: '<b>Тел.:</b> <span>+375 17 341-26-54</span>',
			works: '<b>Режим работы:</b> <div><span>Пн-Пт:</span> 9<sup>00</sup> – 19<sup>00</sup></div> <div><span>Сб:</span> 10<sup>00</sup> – 14<sup>00</sup></div>'
		}
	],[
		{lat: 53.8839, lng: 27.4989},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		12,
		{
			title: 'ОАО "Беларусбанк"',
			type: '<b>Тип устройства:</b> <span>РКЦ</span>',
			address: '<b>Адрес:</b> <span>Прилукская, 44</span>',
			phone: '<b>Тел.:</b> <span>+375 17 341-26-54</span>',
			works: '<b>Режим работы:</b> <div><span>Пн-Пт:</span> 9<sup>00</sup> – 19<sup>00</sup></div> <div><span>Сб:</span> 10<sup>00</sup> – 14<sup>00</sup></div>'
		}
	],[
		{lat: 53.8502, lng: 27.4635},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		12,
		{
			title: 'ОАО "Беларусбанк"',
			type: '<b>Тип устройства:</b> <span>РКЦ</span>',
			address: '<b>Адрес:</b> <span>Есенина, 16</span>',
			phone: '<b>Тел.:</b> <span>+375 17 341-26-54</span>',
			works: '<b>Режим работы:</b> <div><span>Пн-Пт:</span> 9<sup>00</sup> – 19<sup>00</sup></div> <div><span>Сб:</span> 10<sup>00</sup> – 14<sup>00</sup></div>'
		}
	],[
		{lat: 53.9132, lng: 27.5685},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		12,
		{
			title: 'ОАО "Беларусбанк"',
			type: '<b>Тип устройства:</b> <span>РКЦ</span>',
			address: '<b>Адрес:</b> <span>г. Минск ул. Куйбышева, 18</span>',
			phone: '<b>Тел.:</b> <span>+375 17 341-26-54</span>',
			works: '<b>Режим работы:</b> <div><span>Пн-Пт:</span> 9<sup>00</sup> – 20<sup>00</sup></div> <div><span>Сб:</span> 10<sup>00</sup> – 16<sup>00</sup></div>'
		}
	]
];

var styleMap = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#215736"},{"visibility":"on"}]}];

function mapMainInit(){
	if (!$('[id$="-map-location"]').length) {
		return;
	}

	function mapCenter(index){
		var localObject = localObjects[index];

		return{
			lat: localObject[0].lat + localObject[1].latBias,
			lng: localObject[0].lng + localObject[1].lngBias
		};
	}

	var mapOptions = {
		zoom: 12,
		//center: mapCenter(0),
		center: {lat: 53.9023, lng: 27.5618},
		styles: styleMap,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false
	};

	var markers = [],
		elementById = [
			document.getElementById('points-map-location')
		];

	if($(elementById[0]).length){
		var map = new google.maps.Map(elementById[0], mapOptions);
		addMarker(0, map);
		addMarker(1, map);
		addMarker(2, map);
		addMarker(3, map);
		addMarker(4, map);

		/*aligned after resize*/
		//var resizeTimer1;
		//$(window).on('resize', function () {
		//	clearTimeout(resizeTimer1);
		//	resizeTimer1 = setTimeout(function () {
		//		moveToLocation(0, map);
		//	}, 500);
		//});
	}

	/*change location*/
	//$('.contacts__biz a').on('click', function(e) {
	//	var index = $(this).data('location');
	//	deleteMarkers();
	//	moveToLocation(index,map);
	//	addMarker(index,map);
	//	e.preventDefault();
	//});

	/*move to location*/
	//function moveToLocation(index, map){
	//	var object = localObjects[index];
	//	var center = new google.maps.LatLng(mapCenter(index));
	//	map.panTo(center);
	//	map.setZoom(object[3]);
	//}

	var infoWindow = new google.maps.InfoWindow({
		//content: ,
		maxWidth: 220
	});

	function addMarker(index, map) {
		var object = localObjects[index];
		var marker = new google.maps.Marker({
			position: object[0],
			//animation: google.maps.Animation.DROP,
			map: map,
			icon: object[2],
			title: object[4].title
		});

		markers.push(marker);

		function onMarkerClick() {
			var marker = this;

			var latLng = marker.getPosition();

			infoWindow.setContent(
					'<div class="map-popup">' +
					'<h4>'+object[4].title+'</h4>' +
					'<div class="map-popup__list">' +
					'<div class="map-popup__row">'+object[4].address+'</div>' +
					'<div class="map-popup__row">'+object[4].type+'</div>' +
					'<div class="map-popup__row">'+object[4].phone+'</div>' +
					'<div class="map-popup__row">'+object[4].works+'</div>' +
					'<div class="map-popup__row"><b>Координаты:</b><div>'+latLng.lat() + ', ' + latLng.lng()+'</div></div>' +
					'</div>' +
					'</div>'
			);

			//map.setCenter(marker.getPosition());
			infoWindow.close();

			infoWindow.open(map, marker);
		}

		map.addListener('click', function () {
			infoWindow.close();
		});

		marker.addListener('click', onMarkerClick);
	}

	//function setMapOnAll(map) {
	//	for (var i = 0; i < markers.length; i++) {
	//		markers[i].setMap(map);
	//	}
	//}

	//function deleteMarkers() {
	//	setMapOnAll(null);
	//	//markers = [];
	//}
}
/*map init end*/

/*lightbox popup*/
function lightboxPopup(){
	$('.popup-gmaps, .movie__video > a').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		tClose: 'Закрыть (Esc)',
		tLoading: 'Загрузка...',

		fixedContentPos: false,
		callbacks:{
			beforeClose: function() {
				$('.mfp-opened').removeClass('mfp-opened');
			}
		}
	}).on('click', function () {
		$(this).addClass('mfp-opened');
	});

	$('.gallery-zoom').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true
			// titleSrc: function(item) {
			// 	return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			// }
		},
		tClose: 'Закрыть (Esc)',
		tLoading: 'Загрузка...',
		gallery: {
			enabled: true,
			tPrev: 'Предыдущий',
			tNext: 'Следующий',
			tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}

	});
}
/*lightbox popup end*/

/*buttons form*/
function buttonsFromBehavior (){
	var btnForm = $('.btn-form-js');
	if(btnForm.length && DESKTOP){
		var btnSubmitActive = true;
		var _activeStateClass = 'active-state';

		btnForm.filter(':submit').on('mouseenter', function () {
			if($(window).outerWidth() < 980){
				return;
			}

			var $currentBtn = $(this);
			var $currentBtnWrap = $currentBtn.closest('.js-btn-form-wrap');

			if(!btnSubmitActive){
				$currentBtnWrap.removeClass(_activeStateClass);
				btnSubmitActive = true;
				return false;
			}
		});

		btnForm.filter(':reset').on('mouseenter', function () {
			if($(window).outerWidth() < 980){
				return;
			}

			var $currentBtn = $(this);
			var $currentBtnWrap = $currentBtn.closest('.js-btn-form-wrap');

			if(btnSubmitActive){
				$currentBtnWrap.addClass(_activeStateClass);
				btnSubmitActive = false;
				return false;
			}
		});
	}
}
/*buttons form end*/

/*multi accordion*/
(function () {
	var MultiAccordion = function (settings) {
		var options = $.extend({
			accordionContainer: null, //блок-обертка аккордеона
			accordionItem: null, //непосредственный родитель сворачиваемого элемента
			accordionEvent: null, //элемент, по которому производим клик
			collapsibleElement: null, //сворачиваемый элемент
			totalCollapsible: null, //элемент, по клику на который сворачиваются все аккордены в наборе
			according: true, //флаг, одновременного закрытия открытых элементов. эффект аккордеона
			collapsibleAll: false,
			resizeCollapsible: false, //флаг, сворачивание всех открытых аккордеонов при ресайзе
			totalExpand: false, //флаг, сворачивание всех открытых аккордеонов при ресайзе
			animateSpeed: 300
		}, settings || {});

		this.options = options;
		var container = $(options.accordionContainer);
		this.$accordionContainer = container;
		this.$accordionItem = $(options.accordionItem, container);
		this.$accordionEvent = $(options.accordionEvent, container);
		this.$collapsibleElement = $(options.collapsibleElement);
		this.$totalCollapsible = $(options.totalCollapsible);
		this._according = options.according;
		this._collapsibleAll = options.collapsibleAll;
		this._resizeCollapsible = options.resizeCollapsible;
		this._totalExpand = options.totalExpand;
		this._animateSpeed = options.animateSpeed;

		this.modifiers = {
			active: 'active'
		};

		this.bindEvents();
		this.totalCollapsible();
		this.totalCollapsibleOnResize();
		if(this._totalExpand || container.data('open') == 'all'){
			this.totalExpandBeforeStart();
		}
	};

	MultiAccordion.prototype.totalExpandBeforeStart = function () {
		var self = this;
		self.$collapsibleElement.slideDown(self._animateSpeed, function () {
			$(this).closest(self.$accordionItem).addClass(self.modifiers.active);

			self.eventOpened();
		});
	};

	MultiAccordion.prototype.totalCollapsible = function () {
		var self = this;
		self.$totalCollapsible.on('click', function () {
			self.$collapsibleElement.slideUp(self._animateSpeed, function () {
				self.eventClosed();
			});
			self.$accordionItem.removeClass(self.modifiers.active);
		})
	};

	MultiAccordion.prototype.totalCollapsibleOnResize = function () {
		var self = this;
		$(window).on('resizeByWidth', function () {
			if(self._resizeCollapsible){
				self.$collapsibleElement.slideUp(self._animateSpeed, function () {
					self.eventClosed();
				});
				self.$accordionItem.removeClass(self.modifiers.active);
			}
		});
	};

	MultiAccordion.prototype.bindEvents = function () {
		var self = this,
				modifiers = this.modifiers,
				animateSpeed = self.options.animateSpeed,
				accordionContainer = this.$accordionContainer,
				anyAccordionItem = self.options.accordionItem,
				collapsibleElement = self.options.collapsibleElement;

		self.$accordionContainer.on('click', self.options.accordionEvent, function (e) {
			var current = $(this);
			var currentAccordionItem = current.closest(anyAccordionItem); // текущий непосредственный родитель сворачиваемого элемента
			console.log('current: ', currentAccordionItem);

			if (!currentAccordionItem.has(collapsibleElement).length){
				return; // если текущий непосредственный родитель сворачиваемого элемента не содержит сворачиваемый элемент
			}

			e.preventDefault();

			if (current.parent().prop("tagName") != currentAccordionItem.prop("tagName")) {
				current = current.parent();
			}

			if (current.siblings(collapsibleElement).is(':visible')){
				currentAccordionItem.removeClass(modifiers.active).find(collapsibleElement).slideUp(animateSpeed, function () {
					self.eventClosed();
				});
				currentAccordionItem.find(anyAccordionItem).removeClass(modifiers.active);
				return;
			}


			if (self._collapsibleAll){
				var siblingContainers = $(accordionContainer).not(current.closest(accordionContainer));
				siblingContainers.find(collapsibleElement).slideUp(animateSpeed, function () {
					self.eventClosed();
				});
				siblingContainers.find(anyAccordionItem).removeClass(modifiers.active);
			}

			if (self._according) {
				currentAccordionItem.siblings().removeClass(modifiers.active).find(collapsibleElement).slideUp(animateSpeed, function () {
					self.eventClosed();
				});
				currentAccordionItem.siblings().find(anyAccordionItem).removeClass(modifiers.active);
			}

			currentAccordionItem.addClass(modifiers.active);
			current.siblings(collapsibleElement).slideDown(animateSpeed, function () {
				self.eventOpened();
			});
		})
	};

	MultiAccordion.prototype.eventClosed = function() {
		$(window).trigger('accordionClosed');
		$(window).trigger('accordionEvent');
	};

	MultiAccordion.prototype.eventOpened = function() {
		$(window).trigger('accordionOpened');
		$(window).trigger('accordionEvent');
	};

	window.MultiAccordion = MultiAccordion;
}());

function multiAccordionInit() {
	if($('.m-accordion-js').length){
		new MultiAccordion({
			accordionContainer: '.structure__list',
			accordionItem: 'li',
			accordionEvent: '.structure__title',
			collapsibleElement: '.structure__title + ul',
			according: false,
			animateSpeed: 300
		});
	}
}
/*multi accordion end*/

/*multi search*/
function multiSearchInit() {
	$( "#multi-search-tags, .search-form input[type='search']" ).autocomplete({
		source: "../erip/ajax/autocomplete.json",
		minLength: 2,
		open: function () {
			var $this = $(this);
			var dataClass = $this.data('class');
			var dataClassValue = dataClass == undefined ? "default" : dataClass;
			$this
				.data("uiAutocomplete")
				.menu.element.addClass('ui-widget-' + dataClassValue)
				.css('max-width',$this.outerWidth());
		},
		select: function( event, ui ) {
			log( ui.item ?
			"Selected: " + ui.item.value + " aka " + ui.item.id :
			"Nothing selected, input was " + this.value );
		}
	});

	$( ".search-form input[type='search']" ).autocomplete( "option", "appendTo", ".header" );
}
/*multi search end*/

/* multiselect init */
// add ui position add class
function addPositionClass(position, feedback, obj){
	removePositionClass(obj);
	obj.css( position );
	obj
		.addClass( feedback.vertical )
		.addClass( feedback.horizontal );
}
// add ui position remove class
function removePositionClass(obj){
	obj.removeClass('top');
	obj.removeClass('bottom');
	obj.removeClass('center');
	obj.removeClass('left');
	obj.removeClass('right');
}
function customSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
			var placeholderText = $(selectItem).attr('data-placeholder');
			var flag = true;
			if ( placeholderText === undefined ) {
				placeholderText = $(selectItem).find(':selected').html();
				flag = false;
			}
			var classes = $(selectItem).attr('class');
			selectArray[selectIndex] = $(selectItem).multiselect({
				header: false,
				height: 'auto',
				minWidth: 50,
				selectedList: 1,
				classes: classes,
				multiple: false,
				noneSelectedText: placeholderText,
				show: ['fade', 300],
				hide: ['fade', 300],
				create: function(event){
					var select = $(this);
					var button = $(this).multiselect('getButton');
					var widget = $(this).multiselect('widget');
					button.wrapInner('<span class="select-inner"></span>');
					button.find('.ui-icon').append('<i class="arrow-select"></i>')
						.siblings('span').addClass('select-text');
					widget.find('.ui-multiselect-checkboxes li:last')
						.addClass('last')
						.siblings().removeClass('last');
					if ( flag ) {
						$(selectItem).multiselect('uncheckAll');
						$(selectItem)
							.multiselect('widget')
							.find('.ui-state-active')
							.removeClass('ui-state-active')
							.find('input')
							.removeAttr('checked');
					}
				},
				selectedText: function(number, total, checked){
					var checkedText = checked[0].title;
					return checkedText;
				},
				position: {
					my: 'left top',
					at: 'left bottom',
					using: function( position, feedback ) {
						addPositionClass(position, feedback, $(this));
					}
				}
			});
		});
		$(window).resize(selectResize);
	}
}
function selectResize(){
	if ( selectArray.length ) {
		$.each(selectArray, function(i, el){
			var checked = $(el).multiselect('getChecked');
			var flag = true;
			if ( !checked.length ) {
				flag = false
			}
			$(el).multiselect('refresh');
			if ( !flag ) {
				$(el).multiselect('uncheckAll');
				$(el)
					.multiselect('widget')
					.find('.ui-state-active')
					.removeClass('ui-state-active')
					.find('input')
					.removeAttr('checked');
			}
			$(el).multiselect('close');
		});
	}
}
/* multiselect init end */

/** ready/load/resize document **/

$(document).ready(function(){
	bgParallaxOnMousemove();
	bgParallaxOnScroll();
	placeholderInit();
	showFormSearch();
	slidersInit();
	sidebarBehavior();
	headerFixed();
	//catalogMenuScroll();
	catalogMenuSelect();
	siteMapSwitcher();
	faqBehaviorInit();
	terminalsSwitcherInit();
	actionsLayout();
	asidePanelSwitcher();
	mapMainInit();
	lightboxPopup();
	buttonsFromBehavior();
	stickyLayout();
	multiAccordionInit();
	multiSearchInit();
	if(DESKTOP){
		customSelect($('.select select'));
	}
	tabs();
});

$(window).load(function () {
	equalHeightInit();
});