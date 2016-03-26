$(function () {

  var firstScrollTrigger = true;
  $(window).on('scroll', function (e){
    
    var topDistance = $(window).scrollTop(), 
      screenBottom = topDistance + $(window).height(),
      delay = 0;

    // trigger the scroll animations
    $('.section-inner > *').each(function () {
      var screenVisible = screenBottom > $(this).offset().top - 100; // accounts for animation translation
      if ($(this).hasClass('visible') || !screenVisible) {
        return;
      }
      (function (_delay, $this) {
        setTimeout(function () {
          $this.addClass('visible');

        }, _delay);
      })(delay, $(this));
        
      delay += 150;
    });
  });

  $(window).on('load', function (e) {

    $(window).trigger('scroll');

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

});