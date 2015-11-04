define(['View', getGuideViewTemplatePath('alert'), 'UIAlert','UIScrollX'], function (View, viewhtml, UIAlert,UIScrollX) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1',    //简单使用
      'click .demo2': 'demo2',    //单按钮
      'click .demo3': 'demo3'    //三按钮
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
      if (!this.alert1) {
        this.alert1 = new UIAlert();
      }
      this.alert1.animateShow();
    },

    demo2: function () {
      if (!this.alert2) {
        this.alert2 = new UIAlert({
          datamodel: {
            title: 'demo01',
            content: 'content01'
          },
          okAction: function () {
            alert('ok');
            this.hide();
          },
          cancelAction: function () {
            alert('cancel');
            this.hide();
          }
        });
      }
      this.alert2.show();
    },

    demo3: function () {
      if (!this.alert3) {
        this.alert3 = new UIAlert({
          datamodel: {
            title: 'demo02',
            content: 'content02',
            btns: [
              { name: '2', className: 'ct-ui-btns-ok' },
              { name: '22', className: 'ct-ui-btns-no' },
              { name: '222', className: 'ct-ui-btns-unknown' }
            ]
          },
          events: {
            'click .ct-ui-btns-ok': 'okAction',
            'click .ct-ui-btns-no': 'noAction',
            'click .ct-ui-btns-unknown': 'unknownAction'
          },
          okAction: function () {
            alert('2');
            this.hide();
          },
          noAction: function () {
            alert('22');
            this.hide();
          },
          unknownAction: function () {
            alert('222');
            this.hide();
          }
        });
      }
      this.alert3.show();
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
