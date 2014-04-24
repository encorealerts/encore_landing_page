$(function (){
	$('.examples-menu-item').on('click', function (){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#examples-content-trail').removeClass();
		$('#examples-content-trail').addClass('scroll-' + $(this).attr('data-image'));
		/*var top = $('#examples-content-trail').find('[data-example="' + $(this).attr('data-image') + '"]').position().top
		setTimeout(function (){
			$('#examples-content-trail').animate({marginTop: -top});
		}, 10);*/
	}).first().trigger('click');
});