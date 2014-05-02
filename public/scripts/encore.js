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
      setTimeout(function (){
        $('header').addClass('opened');
      }, 0);
    } else if ($(window).scrollTop() === 0 && $('header').hasClass('fixed')){
      $('header').removeClass('opened fixed');
    }
  });
  
  //put animated objects
  var 
    elements = [
      {type:'bird',         x:0,    y:-350, size:'smaller', el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-30,  y:-20,  size:'smaller', el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:50,   y:-40,  size:'smaller', el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:180,  y:-230, size:'smaller', el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-60,  y:-90,  size:'smaller', el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:30,   y:-120, size:'smaller', el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:310,  y:-450, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:290,  y:-530, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:350,  y:-520, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:360,  y:-400, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:310,  y:-350, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-10,  y:-240, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-750,  y:-320, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:70,   y:-90,  size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:20,   y:-100, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-90,  y:-170, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-230, y:-370, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-680,  y:-340, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:50,   y:-240, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:100,  y:-200, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:0,    y:-50,  size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-370, y:-250, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:30,   y:-370, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-550, y:-360, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:260,  y:-360, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-200, y:-150, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-210, y:-270, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-110, y:-60,  size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-320, y:-200, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:300,  y:-300, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:100,  y:-360, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:130,  y:-80,  size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:60,   y:-310, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:110,  y:-260, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-130, y:-230, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-30,  y:-110, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-140, y:-180, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-40,  y:-200, size:'medium',  el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-310, y:-300, size:'medium',  el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:190,  y:-320, size:'medium',  el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:150,  y:-220, size:'large',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-510, y:-350, size:'large',   el:null,steps:[],oX:0,oY:0},
      {type:'bird',         x:-150, y:-370, size:'large',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:-100, y:-120, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:10,   y:-280, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:160,  y:-360, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:60,   y:-150, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:-190, y:-220, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:280,  y:-250, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:-300, y:-350, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'heart',        x:-600, y:-320, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'location',     x:-60,  y:-60,  size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'location',     x:-50,  y:-260, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'location',     x:-350, y:-330, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'location',     x:110,  y:-130, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bubble-left',  x:-10,  y:-320, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bubble-left',  x:-480, y:-370, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bubble-left',  x:120,  y:-310, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bubble-right', x:-250, y:-200, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bubble-right', x:-210, y:-320, size:'small',   el:null,steps:[],oX:0,oY:0},
      {type:'bubble-right', x:-160, y:-110, size:'small',   el:null,steps:[],oX:0,oY:0}
    ],
    funnelEntrance = $('#funnel-entrance'),
    preventScroll = false,
    scrollStart = $('#funnel').offset().top - 200,
    size = 50,
    animationStartPosition = 0,
    isAnimating = false,
    animationToDo = true,
    animationsToDo = 0;
  
  elements.forEach(function (c){
    var element = $('<div></div>')
      .addClass('funnel-item')
      .addClass(c.type)
      .css({
        top:c.y + 'px',
        left:c.x + 'px'
      });
    if (c.size === 'smaller'){
      element.width(size / 2).height(size / 2);
    } else if (c.size === 'small'){
      element.width(size).height(size);
    } else if (c.size === 'medium'){
      element.width(size * 2).height(size * 2);
    } else {
      element.width(size * 3).height(size * 3);
    }
    if (c.size === 'large' && c.type === 'heart'){
      element.attr('id','xxx');
    }
    c.el = element;
    funnelEntrance.append(element);
    c.oX = -(c.el.width() / 2);
    c.oY = -(c.el.height() / 2);
  });
  
  function showAnimationResults(){
    $('.funnel-result').animate({height:'120px'}).promise().done(function (){
      $('.funnel-result.alert-2').animate({left:-150,top:130});
      $('.funnel-result.alert-3').animate({left:70,top:130}).promise().done(notifyAnimationEnd);
    });
    $('.funnel-money').animate({height:50}).promise().done(function (){
      $('.funnel-money:eq(0)').animate({left:-200,top:170});
      $('.funnel-money:eq(1)').animate({left:-100,top:260});
      $('.funnel-money:eq(2)').animate({left:74,top:260});
      $('.funnel-money:eq(3)').animate({left:174,top:170});
    });
  }
  
  function hideAnimationResults(){
    $('.funnel-result.alert-2').animate({left:-50,top:200}, 150);
    $('.funnel-result.alert-3').animate({left:-50,top:200}, 150, function (){
      $('.funnel-result').animate({height:'0'}, 150).promise().done(notifyAnimationEnd);
    });
    $('.funnel-money').animate({left:-13,top:200}).promise().done(function (){
      $('.funnel-money').animate({height:'0'}, 150);
    });
  }
  
  function doAnimation(c, x, y, reverse){
    if (reverse && (x !== c.oX || y !== c.oY)){
      $(c.el).show();
    }
    c.el.animate({left:x,top: y}, function (){
      if (!reverse && ($(this).position().left === c.oX && $(this).position().top === c.oY)){
        $(this).hide();
      }
      notifyAnimationEnd();
    });
  }
  
  function advanceIconsAnimation(){
    onAnimationsStart(elements.length + 1); //amount of animations
    elements.forEach(function (c){
      doAnimation(c, c.oX, c.oY, false);
    });
    setTimeout(function (){
      showAnimationResults();
    }, 100);
  }
  
  function reduceIconsAnimation(){
    onAnimationsStart(elements.length + 1); //amount of animations
    elements.forEach(function (c){
      doAnimation(c, c.x, c.y, true);
    });
    setTimeout(function (){
      hideAnimationResults();
    }, 100);
  }
  
  function onAnimationsStart(amount){
    animationsToDo = amount;
    isAnimating = true;
  }
  
  function onAnimationsEnd(){
    isAnimating = false;
    animationToDo = !animationToDo;
  }
  
  function notifyAnimationEnd(){
    animationsToDo--;
    if (animationsToDo === 0){
      onAnimationsEnd();
    }
  }
  
  $(window).on('DOMMouseScroll onmousewheel', function (e){
    if (isAnimating){e.preventDefault();}
  });
  
  $(window).on('scroll', function (e){
    if (isAnimating){
      e.preventDefault();
      window.scrollTo(0, animationStartPosition);
      return;
    }
    if ($(window).scrollTop() > scrollStart && animationToDo){
      animationStartPosition = $(window).scrollTop();
      advanceIconsAnimation();
    } else if ($(window).scrollTop() < scrollStart && !animationToDo){
      animationStartPosition = $(window).scrollTop();
      reduceIconsAnimation();
    }
  });
  
  $(window).on('keydown', function (e){
    if (isAnimating && (e.keyCode === 40 /*up*/|| e.keyCode === 38 /*down*/|| e.keyCode === 36 /*home*/ || e.keyCode === 35/*end*/)){
      e.preventDefault();
    }
  });
});