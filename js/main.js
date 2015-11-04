/**
 * Created by Lance.Zhao on 2015/4/17.
 */
(function (w,d) {

  var animations = {
    slideleft: function (inView, outView, callback) {
      var self = this;
      inView.$el.addClass('animatestart');
      inView.show();

      inView.$el.css({
        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
        '-moz-transform': 'translate3d(100%, 0px, 0px)'
      });

      inView.$el.animate({
        '-webkit-transform': 'translate3d(0px, 0px, 0px)',
        '-moz-transform': 'translate3d(0px, 0px, 0px)'
      }, 300, 'linear', function () {
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');

        inView.$el.removeClass('animatestart');
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');
        outView.hide();

        callback && callback.call(self, inView, outView);

      });

    },

    slideright: function (inView, outView, callback) {
      var self = this;
      inView.show();
      outView.$el.addClass('animatestart');
      outView.$el.css({
        '-webkit-transform': 'translate3d(0%, 0px, 0px)',
        '-moz-transform': 'translate3d(0%, 0px, 0px)'
      });

      outView.$el.animate({
        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
        '-moz-transform': 'translate3d(100%, 0px, 0px)'
      }, 300, 'linear', function () {
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');

        outView.$el.removeClass('animatestart');
        outView.hide();

        callback && callback.call(self, inView, outView);

      });
    },

    slideleft: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');
      inView.$el.addClass('animatestart');
      inView.$el.addClass('sliderightin');
      inView.show();

      inView.$el.one('webkitAnimationEnd transitionend oTransitionEnd', function (e) {
        if(e.target === e.currentTarget){
          outView.hide();
          $('body').removeClass('hiddenx');
          inView.$el.removeClass('animatestart');
          inView.$el.removeClass('sliderightin');
          callback && callback.call(scope, inView, outView);
        }
      }, 340);
    },

    slideright: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');

      outView.$el.addClass('animatestart');
      outView.$el.addClass('sliderightout');
      inView.show();

      outView.$el.one('webkitAnimationEnd transitionend oTransitionEnd', function (e) {

        if(e.target === e.currentTarget){
          $('body').removeClass('hiddenx');
          outView.$el.removeClass('animatestart');
          outView.$el.removeClass('sliderightout');
          outView.hide();
          callback && callback.call(scope, inView, outView);
        }
      }, 340);
    }
  };

  require(['AbstractApp','storage'], function (App,storage) {
    //实例化App
    var app = new App({
      //选择pushState还是hashChange
      hasPushState: false,
      'defaultView': 'index',
      'viewRootPath': jsapp.js_path+'views/',
      animations: animations
    });
    $.bindFastClick && $.bindFastClick();
    try {
      storage.getInstance().removeOverdueCathch()
    } catch(n) {}

    //highcharts
  });

  try{
    var highChartsLib = localStorage.getItem('highCharts');
  }catch(e){}

  if(highChartsLib){
    _.execScript(highChartsLib);
  }else{
    var url = 'js/app/lib/highCharts.min.js';
    var xhr = window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new window.XMLHttpRequest;
    xhr.open("GET", url, !0);
    xhr.onreadystatechange = function() {
        if (4 === xhr.readyState) {
          if (200 !== xhr.status && 0 !== xhr.status) throw new Error("Could not load: " + url + ", status = " + xhr.status);
          _.execScript(xhr.responseText);
          localStorage.setItem('highCharts',xhr.responseText);
        }
      };
     xhr.send(null);
//      $.ajax({
//          url: "js/app/lib/highCharts.min.js",
//          dataType: "script",
//          success: function(data){
//              localStorage.setItem('highCharts',data);
//          }
//      });
  }
})(window,document);
