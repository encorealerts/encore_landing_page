window.isMobile = false;

$(function (){

  var mobileFilesLoaded = false;
  var webFilesLoaded = false;
  var blogPosts = [
    {
      img:'/images/blog/3-reasons.png',
      url:'http://encorealert.com/blog/3-reasons-influencer-marketing/'
    },{
      img:'/images/blog/6-ways-love-brand.png',
      url:'http://encorealert.com/blog/customer-delight/'
    },{ 
      img:'/images/blog/real-time-awesome.png',
      url:'http://encorealert.com/blog/reactive-proactive-3-case-studies-will-remind-real-time-marketing-awesome/'
    },{
      img:'/images/blog/why-how-what.png',
      url:'http://encorealert.com/blog/3-keys-clear-effective-message-2/'
    }];

  function detectMobile(){
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ($(window).width() < 960);
  }
  detectMobile();

  $('#top-getalerts-button').hide();

  $(window).on('resize', function (){
    detectMobile();
    if (isMobile) {
      $('#top-getalerts-button').hide();
      if (!mobileFilesLoaded){
        loadMobileFiles();
      }
    } else {
      if (!webFilesLoaded) {
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

    setTimeout(function (){
      var script = document.createElement('script');
      script.src = '/scripts/olark.js';
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }, 500);
  });

  $('.examples-menu-item').on('click', function (){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('#examples-content-trail').removeClass();
    $('#examples-content-trail').addClass('scroll-' + $(this).attr('data-image'));
  }).first().trigger('click');

  $('#top-tour-button, #top-getalerts-button').on('click', function (e){
    var hash = $(this).attr('href');
    e.preventDefault();
    $('html, body').animate({scrollTop:$(hash).position().top});
    window.location.hash = hash;
  });

  (function (){
    var
      calcDate = new Date().setDate(03,05,2014),
      today = new Date().getTime(),
      base = 438507395,
      tweetsPerDay = 1000000,
      tweetsPerSecond = Math.round(tweetsPerDay / 24 / 60 / 60),
      days = (today - calcDate) / 86400000,
      tweetsFiltered = Math.round(base + (tweetsPerDay * days));
    $('#clients-tweets-filtered-counter').text(tweetsFiltered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setInterval(function (){
      tweetsFiltered += tweetsPerSecond;
      $('#clients-tweets-filtered-counter').text(tweetsFiltered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }, 1000);
  }());

  $('#logo').on('click', function (e){
    e.preventDefault();
    FunnelAnimation.scrollPageWithoutStops(0);
    window.location.hash = '';
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
      $('#top-getalerts-button').fadeIn();
    } else if ($(window).scrollTop() === 0 && $('header').hasClass('fixed')){
      $('header').removeClass('opened fixed');
      $('#top-getalerts-button').hide();
    }
  });

  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    var hubspotutk = document.cookie.split('; ').filter(function (c) { return c.split('=')[0] === 'hubspotutk'; }).map(function (c){ return c.split('=')[1] })[0]
    var hsContext = {
      'hutk': hubspotutk,
      'ipAddress': window._IP,
      'pageUrl': window.location.href,
      'pageName': document.title
    };
    $('#submit-hubspot-contact [name="hs_context"]').val(encodeURIComponent(JSON.stringify(hsContext)));
    $('#submit-hubspot-contact [name="email"]').val(this.email.value);
    $('#submit-hubspot-contact').trigger('submit');

    $thanksMsg = $('<h2>Thanks for submitting your email! We’ll be in touch with you shortly.</h2>');
    $(this).parent().empty().append($thanksMsg);

    setTimeout(function () {
      $thanksMsg.addClass('animate');
    },1);

    return false;
  });
});