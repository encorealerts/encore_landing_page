window.isMobile = false;

$(function (){

  var mobileFilesLoaded = false;
  var webFilesLoaded = false;
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

  function detectMobile(){
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ($(window).width() < 960);
  }
  detectMobile();

  $(window).on('resize', function (){
    detectMobile();
    if (isMobile){
      if (!mobileFilesLoaded){
        loadMobileFiles();
      }
    } else {
      if (!webFilesLoaded){
        loadWebFiles();
        FunnelAnimation.init();
      }
    }
  });

  if (!isMobile){
    FunnelAnimation.init();
  }

  function loadMobileFiles(){
    mobileFilesLoaded = true;
    $('#examples-mobile').append(
      $('<h1>Important People</h1>'),
      $('<img src="/images/influencer-alert.jpg" alt="influencer-alert"/>'),
      $('<h1>Best Content</h1>'),
      $('<img src="/images/content-alert.jpg" alt="content-alert"/>'),
      $('<h1>Your Results</h1>'),
      $('<img src="/images/growth-alert.jpg" alt="growth-alert"/>')
    );
  }

  function loadWebFiles(){
    webFilesLoaded = true;
    $('#email-background').css('background-image', 'url("/images/gmail-screenshot.png")');
    $('[data-example="influencer"]').css('background-image', 'url("/images/influencer-alert.jpg")');
    $('[data-example="content"]').css('background-image', 'url("/images/content-alert.jpg")');
    $('[data-example="growth"]').css('background-image', 'url("/images/growth-alert.jpg")');
  }

  $(window).on('load', function (){
    if (isMobile){
      loadMobileFiles();
    } else {
      loadWebFiles();
    }
    $('.blog-content-box').each(function (i){
      $(this).css('background-image', 'url(' + blogPosts[i].img + ')');
      $(this).attr('href', blogPosts[i].url)
    });
  });

  $('.examples-menu-item').on('click', function (){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('#examples-content-trail').removeClass();
    $('#examples-content-trail').addClass('scroll-' + $(this).attr('data-image'));
  }).first().trigger('click');

  $('#top-tour-button').on('click', function (e){
    var hash = $(this).attr('href');
    e.preventDefault();
    $('html, body').animate({scrollTop:$(hash).position().top});
    window.location.hash = hash;
  });

  $(window).on('scroll.header', function (){
    if (isMobile){
      return;
    }
    if ($(window).scrollTop() > 0 && !$('header').hasClass('fixed')){
      $('header').addClass('fixed');
      setTimeout(function (){
        $('header').addClass('opened');
      }, 0);
    } else if ($(window).scrollTop() === 0 && $('header').hasClass('fixed')){
      $('header').removeClass('opened fixed');
    }
  });
});