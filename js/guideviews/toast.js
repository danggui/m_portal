define(['View', getGuideViewTemplatePath('toast'), 'UIToast','UIScrollX'], function (View, viewhtml, UIToast,UIScrollX) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4',
      'click .demo5': 'demo5'
    },

    initElement: function () {
      $(".wscroller").each(function(i,obj){
        new UIScrollX({
          swrapper:$(obj),
          scroller:$(obj).find(".sscroller")
        });
      });
    },

    demo1: function () {
      if (!this.toast1) {
        this.toast1 = new UIToast({
          datamodel: {
            content: 'content'
          },
          TIMERRES :  true
        });
      }
      this.toast1.show();
    },

    demo2: function () {
      if (!this.toast2) {
        this.toast2 = new UIToast({
          datamodel: {
            content: '2s后关闭'
          },
          hideSec: 2000

        });
      }
      this.toast2.show();
    },

    demo3: function () {
      if (!this.toast3) {
        this.toast3 = new UIToast({
          datamodel: {
            content: 'content01'
          },
          maskToHide: false
        });
      }
      this.toast3.show();
    },

    demo4: function () {
      if (!this.toast4) {
        this.toast4 = new UIToast({
          datamodel: {
            content: 'callback'
          },
          hideAction: function () {
            console.log('my self hideAction');
          }
        });
      }
      this.toast4.show();
    },

    demo5: function () {
      if (!this.toast5) {
        this.toast5 = new UIToast({
          datamodel: {
            content: 'content01'
          }
        });
      }
      this.toast5.showToast("自定义内容",function () {
        console.log('自定义内容');
      });
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      this.initElement();
    },

    onHide: function () {
      if(this.alert1 && this.alert1.status == 'show') this.alert1.hide();
      if(this.alert2 && this.alert2.status == 'show') this.alert2.hide();
      if(this.alert3 && this.alert3.status == 'show') this.alert3.hide();
      if(this.alert4 && this.alert4.status == 'show') this.alert4.hide();
    }

  });
});
