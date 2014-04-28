$(function (){
	$('.examples-menu-item').on('click', function (){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('#examples-content-trail').removeClass();
		$('#examples-content-trail').addClass('scroll-' + $(this).attr('data-image'));
	}).first().trigger('click');

  var blogPosts = [
    {
      img:'/images/blog/3-reasons.png',
      url:'http://blog.encorehq.com/3-reasons-influencer-marketing/'
    },{
      img:'/images/blog/6-ways-love-brand.png',
      url:'http://blog.encorehq.com/customer-delight/'
    },{ 
      img:'/images/blog/real-time-awesome.png',
      url:'http://blog.encorehq.com/reactive-proactive-3-case-studies-will-remind-real-time-marketing-awesome/'
    },{
      img:'/images/blog/why-how-what.png',
      url:'http://blog.encorehq.com/3-keys-clear-effective-message-2/'
    }];
  $('.blog-content-box').each(function (i){
    $(this).css('background-image', 'url(' + blogPosts[i].img + ')');
    $(this).attr('href', blogPosts[i].url)
  });

  $(window).on('scroll', function (){
    if ($(window).scrollTop() > 0 && !$('header').hasClass('fixed')){
      $('header').addClass('fixed');
    } else if ($(window).scrollTop() === 0 && $('header').hasClass('fixed')){
      $('header').removeClass('fixed');
    }
  });
});