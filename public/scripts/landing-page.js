$(function () {

  // mobile menu
  $('#mobile-menu-toggler').on('click', function () {
    $('#menu-right-wrapper ul').toggleClass('mobile-visible mobile-hidden');
  });
  // hide mobile menu after click
  $('#menu-right-wrapper a').on('click', function () {
    if ( $('#menu-right-wrapper ul').hasClass('mobile-visible') ) {
      $('#menu-right-wrapper ul').toggleClass('mobile-visible mobile-hidden');
    }
  });

  function getOverlayShadowCss(marginSize) {
    return '0 -:vpx 0 0 rgba(0,0,0,.3)'.replace(':v', Math.round(marginSize / 10));
  }

  // menu shit
  var lastScroll = 0;
  $(window).on('scroll', function (e){
    
    var topDistance = $(window).scrollTop();

    // trigger the scroll animations
    $('.section-inner > *').each(function () {
      var isVisible = topDistance + $(window).height() > $(this).offset().top;
      if (isVisible) {
        $(this).addClass('visible');
      }
    });

    // overlay animation
    $('.section:not(:first)').each(function () {

      // if top, just move everything to their place
      if (topDistance === 0) {
        return $(this).css('margin-top', 0)//.css('box-shadow', getOverlayShadowCss(0));
      }

      var 
        offsetTop = $(this).offset().top,
        visibleHeight = topDistance + $(window).height() - offsetTop,
        isVisible = topDistance + $(window).height() > offsetTop,
        newMargin,
        limit = Math.round($(this).prev().height() / 1.5); // last section fraction

      if (isVisible) {
        newMargin = ((visibleHeight < limit) ? visibleHeight : limit) / 3;
        $(this).css('margin-top', -newMargin)//.css('box-shadow', getOverlayShadowCss(newMargin));
      } else {
        $(this).css('margin-top', 0)//.css('box-shadow', getOverlayShadowCss(0));
      }
    });

    // menu animation
    if (topDistance > 60) {
      if ($(':animated').size() === 0) {
        $('#menu-wrapper').css('top', 0)[topDistance <= lastScroll ? 'addClass' : 'removeClass']('visible');
      }
    } else {
      $('#menu-wrapper').css('top', '').removeClass('visible');
    }

    lastScroll = topDistance;
  });

  // listen for home/and and trigger scroll
  $(document).on('keyup', function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if ([35, 36].indexOf(code) > -1) {
      setTimeout(function (){
        $(window).trigger('scroll');
      });
    }
  });

  // resize main section to always have size equals or bigger then window
  $(window).on('load resize', function (e) {
    var $main = $('.section#main');
    $main.css('height','auto');
    $main.css('height', $main.height() < $(window).height() ? ($(window).height() + 'px') : '');
  }).trigger('resize');

  // loads home after 1 second if window.load was not triggered
  var scrolled = false, firstScrollTimeout = setTimeout(function () {
    scrolled = true;
    $(window).trigger('scroll');
  }, 1000);

  // load sections async
  setTimeout(function () {
    $('.placeholder').each(function () {
      var url = '/sections/' + $(this).attr('data-section');
      $(this).load(url, function () {
        $(this).children(':first').unwrap();
      });
    });
  }, 1000);

  $(window).on('load', function (e) {
    clearTimeout(firstScrollTimeout);
    if (!scrolled) {
      $(window).trigger('scroll');
    }

    setTimeout(function () {
      var script = document.createElement('script');
      document.body.appendChild(script);
      script.src = '/scripts/olark.js';
    }, 1000);

    // bind google ad words
    $('form button').on('click', function (e) {
      try {
        goog_report_conversion();
      } catch (err) {}

      try {
        fbq('track', 'Lead');
      } catch (err) {}
    });
  });

  //animated scroll
  $('a[href*="#"]').on('click', function (e){
    e.preventDefault();
    var hash = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(hash).offset().top}, 750, 'easeInOutQuad', function () {
      $('html, body').animate({ scrollTop: $(hash).offset().top}, 400, 'easeOutQuad');
    });
    window.location.hash = hash;
  });

  // submit contact
  $(document).on('submit', '.insights-form', function (e) {
    e.preventDefault();
    var 
      hubspotutk = document.cookie.split('; ').filter(function (c) { return c.split('=')[0] === 'hubspotutk'; }).map(function (c){ return c.split('=')[1] })[0],
      hsContext = {
      'hutk': hubspotutk,
      'ipAddress': window._IP,
      'pageUrl': window.location.href,
      'pageName': document.title
    };
    $('#submit-hubspot-contact [name="hs_context"]').val(encodeURIComponent(JSON.stringify(hsContext)));
    $('#submit-hubspot-contact [name="email"]').val(this.email.value);
    $('#submit-hubspot-contact').trigger('submit');

    $('.insights-contact-message').addClass('visible')
    $('.insights-form').addClass('hidden')
    return false;
  });
});