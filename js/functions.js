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
	var $bgParallax = $('.bg-parallax-js');
	if(!$bgParallax.length){
		return;
	}

	var $containerParallax = $('.container-parallax-js');

	$(window).on('load scroll', function () {
		var containerParallaxHeight = $containerParallax.outerHeight();
		var scrolled = $(window).scrollTop();

		console.log('scrolled: ', scrolled);

		if($containerParallax.offset().top + containerParallaxHeight < scrolled){
			return;
		}

		var _scrollSize = scrolled*0.5;
		$bgParallax.css({
			WebkitTransform: 'translateY(' + _scrollSize + 'px)',
			transform: 'translateY(' + _scrollSize + 'px)'
		});

		$bgParallax.toggleClass('parallax-init', _scrollSize != 0);
	});
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
		$stickyJs.stick_in_parent({
			'parent': '.wrapper',
			'bottoming': false
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
	var $sidebar = $('.sidebar');
	if($sidebar.length){
		var _activeClass = 'expanded-sidebar';
		var timerClose;

		$sidebar.on('mouseenter', function () {

			clearTimeout(timerClose);
			$('html').addClass(_activeClass);

		}).on('mouseleave', function () {
			clearTimeout(timerClose);

			timerClose = setTimeout(function () {
				$('html').removeClass(_activeClass);
			}, 200);
		});

		$(document).on('click', function () {
			clearTimeout(timerClose);

			$('html').removeClass(_activeClass);
		});

		$sidebar.on('click', function (e) {
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

	var currentItemId = $navList.find('.active').find('a').attr("href");

	$(currentItemId).show(0)
		.addClass('menu-active');

	var scrollSpeed = 900;

	$navList.find('a').on('click', function(event){
		event.preventDefault();

		$('.catalog-menu-list').hide(0)
			.removeClass('menu-active');

		$navList.find('.active')
			.removeClass('active');

		var navID = $(this).attr("href");
		$(navID).show(0)
			.addClass('menu-active');
		$(this).closest('li').addClass('active');

		var $htmlAndBody = $('html, body');
		if ($(window).scrollTop() > 0 && !$htmlAndBody.is(':animated')) {
			console.log(1);
			$htmlAndBody.stop().animate({
				scrollTop: 0
			}, scrollSpeed, "easeInOutExpo");
		}
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
	var flag = false;

	$terminalItem.on('click', 'h3', function () {
		var $currentItem = $(this).closest('.terminals-item');
		var $currentItemDrop = $currentItem.find($terminalItemDrop);

		if($currentItem.hasClass(_activeClass)){
			flag = true;
		}

		closeTerminalsDrop();

		$currentItemDrop.stop().slideToggle(_duration);
		$currentItem.toggleClass(_activeClass, flag);

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
		animationQueue: true,
		scrollToAccordion: true
		//scrollToAccordionOffset: true
		//activate: function(e, tab) {
		//	console.log(tab);
		//},
		//activateState: function(e, state) {
		//	console.log(state);
		//}
	});
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

		var infoWindow = new google.maps.InfoWindow({
			//content: ,
			maxWidth: 220
		});

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
	$('.popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
}
/*lightbox popup end*/

/** ready/load/resize document **/

$(document).ready(function(){
	bgParallaxOnMousemove();
	bgParallaxOnScroll();
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
	faqBehaviorInit();
	terminalsSwitcherInit();
	tabs();
	mapMainInit();
	lightboxPopup();
});

$(window).load(function () {
	equalHeightInit();
});