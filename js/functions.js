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

	var scrollSpeed = 900;

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

	$terminalItem.on('click', 'h3', function () {
		var $currentHead = $(this);
		var $currentItem = $(this).closest('.terminals-item');
		var $currentItemDrop = $currentItem.find($terminalItemDrop);

		closeTerminalsDrop();

		$currentItemDrop.stop().slideToggle(_duration, function () {
			$currentItem.toggleClass(_activeClass, $currentItemDrop.is(':visible'));
		});

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

/*map init*/
var smallPinMap = 'img/map-pin-sm.png';
		//largePinMap = 'img/map-pin.png';

var localObjects = [
	[
		{lat: 53.8984, lng: 27.5788}, //coordinates of marker
		{latBias: 0.0020, lngBias: 0}, //bias coordinates for center map
		smallPinMap, //image pin
		10,
		{
			title: 'ОАО «АСБ Беларусбанк»',
			address: '<b>Адрес:</b> 220088 Беларусь, Минск, ул. Пулихова д.15',
			phone: '<b>Приёмная:</b> <div>+375 17 327 13 23</div>',
			works: '<b>Эл. почта:</b> <div><span>Пн-Пт:</span> 10<sup>00</sup> – 20<sup>00</sup></div> <div><span>Сб-Вс:</span> 10<sup>00</sup> – 18<sup>00</sup></div>'
		}
	],[
		{lat: 53.8884, lng: 27.5888},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		15,
		{
			title: 'ОАО «Белагропромбанк»',
			address: '<b>Адрес:</b> 220088 Беларусь, Минск, ул. Пулихова д.15',
			phone: '<b>Приёмная:</b> <div>+375 17 233 91 36</div>',
			works: '<b>Эл. почта:</b> <div><span>Пн-Пт:</span> 10<sup>00</sup> – 20<sup>00</sup></div> <div><span>Сб-Вс:</span> 10<sup>00</sup> – 18<sup>00</sup></div>'
		}
	],[
		{lat: 53.8784, lng: 27.5788},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		15,
		{
			title: 'ОАО «Белинвестбанк»',
			address: '<b>Адрес:</b> 220088 Беларусь, Минск, ул. Пулихова д.15',
			phone: '<b>Приёмная:</b> <div>+375 17 294 06 96</div>',
			works: '<b>Эл. почта:</b> <div><span>Пн-Пт:</span> 10<sup>00</sup> – 20<sup>00</sup></div> <div><span>Сб-Вс:</span> 10<sup>00</sup> – 18<sup>00</sup></div>'
		}
	],[
		{lat: 53.8684, lng: 27.5788},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		15,
		{
			title: 'ОАО «БПС-Сбербанк»',
			address: '<b>Адрес:</b> 220088 Беларусь, Минск, ул. Пулихова д.15',
			phone: '<b>Приёмная:</b> <div>+375 17 226 19 33</div>',
			works: '<b>Эл. почта:</b> <div><span>Пн-Пт:</span> 10<sup>00</sup> – 20<sup>00</sup></div> <div><span>Сб-Вс:</span> 10<sup>00</sup> – 18<sup>00</sup></div>'
		}
	],[
		{lat: 53.8782, lng: 27.5897},
		{latBias: 0.0015, lngBias: 0},
		smallPinMap,
		15,
		{
			title: 'ОАО «Белгазпромбанк»',
			address: '<b>Адрес:</b> 220033 Беларусь , Минск, ул. Тростенецкая, 22',
			phone: '<b>Отдел снабжения:</b> <div>+375 17 247 95 69</div>',
			works: '<b>Эл. почта:</b> <div><span>Пн-Пт:</span> 10<sup>00</sup> – 20<sup>00</sup></div> <div><span>Сб-Вс:</span> 10<sup>00</sup> – 18<sup>00</sup></div>'
		}
	]
];

var styleMap = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];

function mapMainInit(){
	if (!$('[id*="-map"]').length) {
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
		zoom: 15,
		center: mapCenter(0),
		styles: styleMap,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false
	};

	var markers = [],
		elementById = [
			document.getElementById('points-map')
		];

	if($(elementById[0]).length){
		var map = new google.maps.Map(elementById[0], mapOptions);
		addMarker(0, map);

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
			content: '<div class="map-popup">' +
			'<h4>'+object[4].title+'</h4>' +
			'<div class="map-popup__list">' +
			'<div class="map-popup__row">'+object[4].address+'</div>' +
			'<div class="map-popup__row">'+object[4].phone+'</div>' +
			'<div class="map-popup__row">'+object[4].works+'</div>' +
			'</div>' +
			'</div>',
			maxWidth: 220
		});

		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});
	}

	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	function deleteMarkers() {
		setMapOnAll(null);
		//markers = [];
	}
}
/*map init end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	//stickyLayout();
	showFormSearch();
	slidersInit();
	sidebarBehavior();
	actionsLayout();
	//headerFixed();
	catalogMenuScroll();
	catalogMenuSelect();
	siteMapSwitcher();
	faqBehaviorInit();
	terminalsSwitcherInit();
	tabs();
	mapMainInit();
});

$(window).load(function () {
	equalHeightInit();
});