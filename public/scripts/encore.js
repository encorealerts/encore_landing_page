$(function (){
	$('.examples-menu-item').on('click', function (){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#examples-content-trail').removeClass();
		$('#examples-content-trail').addClass('scroll-' + $(this).attr('data-image'));
	}).first().trigger('click');
});