/* placeholder */
function placeholderInit(){
	$('[placeholder]').placeholder();
}
/* placeholder end */

/*sticky layout*/
function stickyLayout(){
	$(".sticky-js").stick_in_parent({
		'parent': '.wrapper'
	});
}
/*sticky layout end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	stickyLayout();
});