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
		var timer;

		sidebar.on('mouseenter', function () {
			clearTimeout(timer);
			$('html').addClass('expand-sidebar');

		}).on('mouseleave', function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				$('html').removeClass('expand-sidebar');
			}, 500);
		});

		$(document).on('click', function () {
			clearTimeout(timer);
			$('html').removeClass('expand-sidebar');
		});

		sidebar.on('click', function (e) {
			e.stopPropagation();
		});
	}
}
/*sidebar behavior end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	stickyLayout();
	showFormSearch();
	slidersInit();
	sidebarBehavior();
});