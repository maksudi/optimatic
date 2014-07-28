jQuery(window).bind('scroll', function (){
  if (jQuery(window).scrollTop() > 300){
    jQuery('#main-menu').addClass('navbar-small').removeClass('topnavbar').slideDown(500);
    jQuery('#page-top').addClass('bodytopmargin').removeClass('bodynomargin');
  } else {
    jQuery('#main-menu').removeClass('navbar-small').addClass('topnavbar').slideDown(500);
    jQuery('#page-top').removeClass('bodytopmargin').addClass('bodynomargin');
  }
});



jQuery(document).ready(function($) {
  "use strict";
  
  /*------------------- Scroll to Feature Section ---------------*/
  $('#next-section').click(function() {
    $('html,body').animate({scrollTop:$('#feature').offset().top - 100}, 1000);
  });

});


/*----------------- prettyPhoto Image Gallery -----------------*/
jQuery(document).ready(function($) {
  "use strict";

  jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({social_tools:false});
});




/*------------ Testimonial slider - OWL carousel --------------*/
jQuery(document).ready(function($) {
  "use strict";

  var owl = $("#client-slider");
    owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter

    owl.owlCarousel({
        items : 2, //2 items above 1024px browser width
        itemsDesktop : [1024,1], //1 items between 1000px and 901px
        itemsDesktopSmall : [950,1], // betweem 768px and 601px
        itemsTablet: [480,1], //1 items between 480 and 0
        itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
        autoPlay : false,
        stopOnHover: true
      });

    // Custom Navigation Events
    $(".client-next").click(function(){
      owl.trigger('owl.next');
    });
    $(".client-prev").click(function(){
      owl.trigger('owl.prev');
    });

  });


/*-------- Recent Blog Post Slider - owl carousel -------------*/
jQuery(document).ready(function($) {
  "use strict";

  var owl = $("#recent-post-slider");
  owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter

  owl.owlCarousel({
      items : 3, //3 items above 1000px browser width
      lazyLoad : true,
      itemsDesktop : [1000,3], //3 items between 1000px and 901px
      itemsDesktopSmall : [800,2], // betweem 768px and 601px
      itemsTablet: [480,1], //1 items between 480 and 0
      itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
      autoPlay : false,
      stopOnHover: true
    });

  // Custom Navigation Events
  $(".post-next").click(function(){
    owl.trigger('owl.next');
  });
  $(".post-prev").click(function(){
    owl.trigger('owl.prev');
  });
  
});


/*------------- Team Member Slider - owl carousel-------------*/
jQuery(document).ready(function($) {
  "use strict";

  var owl = $("#team-member-slider");
  owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter

  owl.owlCarousel({
      items : 4, //4 items above 1100px browser width
      itemsDesktop : [1100,3], //3 items between 1000px and 901px
      itemsDesktopSmall : [900,2], // between 900px and 601px
      itemsTablet: [600,1], //1 items between 600px and 0
      itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
      autoPlay : false,
      stopOnHover: true
    });

  // Custom Navigation Events
  $(".team-next").click(function(){
    owl.trigger('owl.next');
  });
  $(".team-prev").click(function(){
    owl.trigger('owl.prev');
  });
  
});



/*--------------------- Portfolio Item Filter-----------------*/
jQuery(document).ready(function($) {
  "use strict";

  var $container = $('.portfolio-item'),
  colWidth = function () {
    var w = $container.width(), 
    columnNum = 1,
    columnWidth = 0;
    if (w > 960) {
      columnNum  = 3;
    }  else if (w > 475) {
      columnNum  = 2;
    }
    columnWidth = Math.floor(w/columnNum);
    $container.find('.item').each(function() {
      var $item = $(this),
      multiplier_w = $item.attr('class').match(/item-w(\d)/),
      multiplier_h = $item.attr('class').match(/item-h(\d)/),
      width = multiplier_w ? columnWidth*multiplier_w[1]-10 : columnWidth-10,
      height = multiplier_h ? columnWidth*multiplier_h[1]*0.7-10 : columnWidth*0.7-10;
      $item.css({
        width: width,
        height: height
      });
    });
    return columnWidth;
  },
  isotope = function () {
    $container.isotope({
      resizable: true,
      itemSelector: '.item',
      masonry: {
        columnWidth: colWidth(),
        gutterWidth: 10
      }
    });
  };
  isotope();
  $(window).smartresize(isotope);

  $('.portfolioFilter a').click(function(){
    $('.portfolioFilter .current').removeClass('current');
    $(this).addClass('current');

    var selector = $(this).attr('data-filter');
    $container.isotope({
      filter: selector,
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    return false;
  }); 
});



/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
 jQuery(document).ready(function($) {
  "use strict";

  $.fn.appear = function(fn, options) {

    var settings = $.extend({

            //arbitrary data to pass to fn
            data: undefined,

            //call fn only on the first appear?
            one: true,

            // X & Y accuracy
            accX: 0,
            accY: 0

          }, options);

    return this.each(function() {

      var t = $(this);

            //whether the element is currently visible
            t.appeared = false;

            if (!fn) {

                //trigger the custom event
                t.trigger('appear', settings.data);
                return;
              }

              var w = $(window);

            //fires the appear event when appropriate
            var check = function() {

                //is the element hidden?
                if (!t.is(':visible')) {

                    //it became hidden
                    t.appeared = false;
                    return;
                  }

                //is the element inside the visible window?
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;

                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();

                if (y + th + ay >= b &&
                  y <= b + wh + ay &&
                  x + tw + ax >= a &&
                  x <= a + ww + ax) {

                    //trigger the custom event
                  if (!t.appeared) t.trigger('appear', settings.data);

                } else {

                    //it scrolled out of view
                    t.appeared = false;
                  }
                };

            //create a modified fn with some additional logic
            var modifiedFn = function() {

                //mark the element as visible
                t.appeared = true;

                //is this supposed to happen only once?
                if (settings.one) {

                    //remove the check
                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                  }

                //trigger the original fn
                fn.apply(this, arguments);
              };

            //bind the modified fn to the element
            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.bind('appear', settings.data, modifiedFn);

            //check whenever the window scrolls
            w.scroll(check);

            //check whenever the dom changes
            $.fn.appear.checks.push(check);

            //check now
            (check)();
          });
};

    //keep a queue of appearance checks
    $.extend($.fn.appear, {

      checks: [],
      timeout: null,

        //process the queue
        checkAll: function() {
          var length = $.fn.appear.checks.length;
          if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        //check the queue asynchronously
        run: function() {
          if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
          $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
      });

    //run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
      'removeAttr', 'addClass', 'removeClass', 'toggleClass',
      'remove', 'css', 'show', 'hide'], function(i, n) {
        var old = $.fn[n];
        if (old) {
          $.fn[n] = function() {
            var r = old.apply(this, arguments);
            $.fn.appear.run();
            return r;
          }
        }
      });

  });


/*---------------- Preloader Animated Loader -----------------*/
jQuery(document).ready(function($) {
  "use strict";

  $(window).load(function() {
    $('#status').fadeOut(); 
    $('#preloader').delay(350).fadeOut('slow'); 
    $('body').delay(350).css({'overflow':'visible'});
  });

});



/*------------------------- Scroll to Top-----------------------*/
jQuery(document).ready(function($) {
"use strict";

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
     $('#scroll-to-top').fadeIn('slow');
   } else {
    $('#scroll-to-top').fadeOut('slow');
  }

}); 

  $('#scroll-to-top').click(function(){
    $("html,body").animate({ scrollTop: 0 }, 1000);
    return false;
  });
});



/*------------------------------ Counter ----------------------------*/
$('.counter').counterUp({
  delay: 10,
  time: 1000
});


/*-------------------- Elements Fading --------------------*/
jQuery(document).ready(function($) {
"use strict";

  $('.element-from-top').each(function () {
    $(this).appear(function() {
      $(this).delay(150).animate({opacity:1,top:"0px"},800);
    }); 
  });


  $('.element-from-bottom').each(function () {
    $(this).appear(function() {
      $(this).delay(150).animate({opacity:1,bottom:"0px"},800);
    }); 
  });


  $('.element-from-bottom-200').each(function () {
    $(this).appear(function() {
      $(this).delay(200).animate({opacity:1,bottom:"0px"},800);
    }); 
  });

$('.element-from-bottom-600').each(function () {
    $(this).appear(function() {
      $(this).delay(600).animate({opacity:1,bottom:"0px"},800);
    }); 
  });


$('.element-from-bottom-1000').each(function () {
    $(this).appear(function() {
      $(this).delay(1000).animate({opacity:1,bottom:"0px"},800);
    }); 
  });


$('.element-from-bottom-1400').each(function () {
    $(this).appear(function() {
      $(this).delay(1400).animate({opacity:1,bottom:"0px"},800);
    }); 
  });



  $('.element-from-left').each(function () {
    $(this).appear(function() {
      $(this).delay(150).animate({opacity:1,left:"0px"},800);
    }); 
  });


  $('.element-from-right').each(function () {
    $(this).appear(function() {
      $(this).delay(150).animate({opacity:1,right:"0px"},800);
    }); 
  });


  $('.element-fade-in').each(function () {
    $(this).appear(function() {
      $(this).delay(150).animate({opacity:1,right:"0px"},800);
    }); 
  });

});



/*-------------------- Parallax --------------------*/
jQuery(document).ready(function($) {
      "use strict";
      $(window).load(function(){
        $(".parallax-style").parallax("50%", 0.0);
      })
    })

