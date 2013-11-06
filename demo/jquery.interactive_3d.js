/* ===========================================================
 * jquery.interactive_3d.js v1.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create a 3D interactive object using images as frames
 * with one js call
 *
 * https://github.com/peachananr/interactive_3d
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    frames: 10,
    cursor: "move",
    speed: 0,
    entrance: true,
    preloadImages: true,
    touchSupport: true,
    loading: "Loading..",
    autoPlay: false
	};
	
	function touchHandler(event) {
      var touch = event.changedTouches[0];

      var simulatedEvent = document.createEvent("MouseEvent");
          simulatedEvent.initMouseEvent({
          touchstart: "mousedown",
          touchmove: "mousemove",
          touchend: "mouseup"
      }[event.type], true, true, window, 1,
          touch.screenX, touch.screenY,
          touch.clientX, touch.clientY, false,
          false, false, false, 0, null);

      touch.target.dispatchEvent(simulatedEvent);
  }
	
	$.fn.preload = function(el) {
	  $("<div class='images_cache'></div>").hide().appendTo(el);
    this.each(function(){
        $('<img/>').attr("src", this).appendTo(".images_cache")
    });
  }
	
	$.fn.drags = function(settings) {

    var $el = this;
    
    return $el.css('cursor', settings.cursor).on("mousedown", function(e) {
        var $drag = $(this).addClass('draggable'),
            cur_pos = e.pageX,
            last_position = {};           
        
        $drag.parents().on("mousemove", function(e) {
            if($('.draggable').length > 0) {
              var src = $el.find("img.main-frame").attr("src"),
                  img_name = src.split('/')[src.split('/').length-1],
                  cur_frame = img_name.split('_')[1].split('.')[0];
                  
              if (typeof(last_position.x) != 'undefined') {
                //get the change from last position to this position
                var deltaX = last_position.x - e.clientX,
                    deltaY = last_position.y - e.clientY;
                
                if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
                  if(cur_frame > 1) {
                    setTimeout(function() {
                       var img_name = src.split('/')[src.split('/').length-1]
                       var directory = src.split('/').slice(0, -1).join("/")
                       var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(cur_frame) - 1) + "." + img_name.split('.')[1]
                        $el.find("img.main-frame").attr("src", new_frame)
                    },settings.speed)
                  } else {
                    setTimeout(function() {
                      var img_name = src.split('/')[src.split('/').length-1]
                      var directory = src.split('/').slice(0, -1).join("/")
                      var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(settings.frames)) + "." + img_name.split('.')[1]
                      $el.find("img.main-frame").attr("src", new_frame)
                    },settings.speed)
                   
                  }
                } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
                  if(cur_frame < settings.frames) {
                    setTimeout(function() {
                      var img_name = src.split('/')[src.split('/').length-1]
                      var directory = src.split('/').slice(0, -1).join("/")
                      var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(cur_frame) + 1) + "." + img_name.split('.')[1]
                        $el.find("img.main-frame").attr("src", new_frame)
                    },settings.speed)
                  } else {
                    setTimeout(function() {
                      var img_name = src.split('/')[src.split('/').length-1]
                      var directory = src.split('/').slice(0, -1).join("/")
                      var new_frame = directory + "/" + img_name.split('_')[0] + "_" + 1 + "." + img_name.split('.')[1]
                      $el.find("img.main-frame").attr("src", new_frame)
                    },settings.speed)
                  }
                }
              }    
                  
              last_position = {
                  x : e.clientX,
                  y : e.clientY
              };
            }
            $(".draggable").on("mouseup", function() {
                $(this).removeClass('draggable')
            });
        });
        e.preventDefault(); // disable selection
    }).on("mouseup", function() {
      $(this).removeClass('draggable');
    });
  }
	

  $.fn.interactive_3d = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this);
        el.find(" > img").addClass("main-frame");  
        el.drags(settings), 
        x = 0,
        step = 100 / parseInt(settings.frames),
        cur_frame = el.find("img.main-frame").attr("src").split('_')[1].split('.')[0];
    
    function animate_3d() {
      var src = el.find("img.main-frame").attr("src");
      el.find("img.main-frame").css("opacity", (x * step)/100);
      if(cur_frame < settings.frames) {
        setTimeout(function() {
          var img_name = src.split('/')[src.split('/').length-1]
          var directory = src.split('/').slice(0, -1).join("/")
          var new_frame = directory + "/" + img_name.split('_')[0] + "_" + (parseInt(cur_frame) + 1) + "." + img_name.split('.')[1]
          el.find("img.main-frame").attr("src", new_frame)
          cur_frame = parseInt(cur_frame) + 1;
        },settings.speed)
      } else {
        setTimeout(function() {
          var img_name = src.split('/')[src.split('/').length-1]
          var directory = src.split('/').slice(0, -1).join("/")
          var new_frame = directory + "/" + img_name.split('_')[0] + "_" + 1 + "." + img_name.split('.')[1]
          el.find("img.main-frame").attr("src", new_frame)
          cur_frame = 1;
        },settings.speed)
      }
    
      if (x++ < (settings.frames - 1)) {
          if (settings.autoPlay != false) {
            setTimeout(animate_3d,  0);
          } else {
            setTimeout(animate_3d,  (x * 1.5));
          }
    
      }
    }
        
    if (settings.entrance == true && settings.autoPlay == false ) {
      if (settings.loading == false && settings.autoPlay == false) animate_3d(); 
    }
    
    if (settings.touchSupport == true) {
      document.addEventListener("touchstart", touchHandler, true);
      document.addEventListener("touchmove", touchHandler, true);
      document.addEventListener("touchend", touchHandler, true);
      document.addEventListener("touchcancel", touchHandler, true);
    }
    
    
    
    if (settings.preloadImages == true) {
      var src = el.find("img.main-frame").attr("src");
      arr = []
      for (var i = 1; i < settings.frames + 1; i++) {
        var img_name = src.split('/')[src.split('/').length-1]
        var directory = src.split('/').slice(0, -1).join("/")
        arr.push(directory + "/" + img_name.split('_')[0] + "_" + i + "." + img_name.split('.')[1])
      }
      $(arr).preload(el);
      
      if (settings.loading != false) {
        var imgs = $(".images_cache > img").not(function() { return this.complete; });
        var count = imgs.length;
        el.append("<div class='loading_3d'>" + settings.loading + "</div>");
        el.find(".main-frame").css("visibility", "hidden");
        if (count) {
            imgs.load(function() {
                count--;
                if (!count) {
                    el.find(".main-frame").css("visibility", "visible");
                    el.find(".loading_3d").remove();
                    if (settings.autoPlay == false) animate_3d();
                }
            });
        } else {
          el.find(".main-frame").css("visibility", "visible");
          el.find(".loading_3d").remove();
          if (settings.autoPlay == false) animate_3d();
        }
      }
      
    }
    
    if (settings.autoPlay != false) {
      
      function intervalTrigger() {
        return window.setInterval( function() {
          animate_3d();
        }, settings.autoPlay );
      };
      
      var id = intervalTrigger();
      
      el.mouseenter(function() {
        window.clearInterval(id);
      }).mouseleave(function() {
        id = intervalTrigger();
      });
      
    }
    
  }
}(window.jQuery);

