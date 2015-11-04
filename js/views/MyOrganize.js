/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('MyOrganize'),'UISliderIscroll','MyOrganizeModel'], function (View, viewhtml,UISlider,MyOrganizeModel) {
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
      this.initSize();
      this._initSlider();
    },

    events: {

    },

    initSize : function(){
//      this.$('.g-flex-container').height($(window).height()-48);
      var h = Math.max($(window).width(),$(window).height());
      this.$('.g-flex-container').height(h);
//      //解决resize问题
//      $(window).off('.flex-container');
//      $(window).on('resize.flex-container', $.proxy(function () {
//        this.$('.g-flex-container').height($(window).height()-48);
//      }, this));
    },

    _initSlider: function () {
      if (this.slider) return;

      var myOrganizeModel = MyOrganizeModel.getInstance();

      myOrganizeModel.execute(function(data){
        this.slider = new UISlider({
          datamodel: {
            data: data.data.superior,
            index: 1,
            itemFn: function (item) {
              return '<div>'+item.department+'</div>'
                +'<div><img src="'+item.photo+'" style="border: 1px solid rgba(0, 0, 0, 0.08);box-shadow: 0 0 0 2px rgba(0,0,0,0.2); border-radius: 50%;"/></div>'
                +'<div>' + item.ee_name + '</div>'
                +'<div>' + item.po_name + '</div>';
            }
          },
          momentum: true,
          displayNum: 3,
          wrapper: this.$('.demo1')
//        changed: function (item) {
//          sec.html('当前选择：' + 'id: ' + item.id + ', ' + 'name: ' + item.name);
//        }

        });
        this.slider.show();

        this.slider1 = new UISlider({
          datamodel: {
            data: data.data.equal,
            index: 1,
            itemFn: function (item) {
              return '<div>'+item.department+'</div>'
                +'<div><img src="'+item.photo+'" style="border: 1px solid rgba(0, 0, 0, 0.08);box-shadow: 0 0 0 2px rgba(0,0,0,0.2); border-radius: 50%;"/></div>'
                +'<div>' + item.ee_name + '</div>'
                +'<div>' + item.po_name + '</div>';
            }
          },
          momentum: true,
          displayNum: 3,
          wrapper: this.$('.demo2')
        });
        this.slider1.show();

        this.slider2 = new UISlider({
          datamodel: {
            data: data.data.subordinate,
            index: 1,
            itemFn: function (item) {
              return '<div>'+item.department+'</div>'
                +'<div><img src="'+item.photo+'" style="border: 1px solid rgba(0, 0, 0, 0.08);box-shadow: 0 0 0 2px rgba(0,0,0,0.2); border-radius: 50%;"/></div>'
                +'<div>' + item.ee_name + '</div>'
                +'<div>' + item.po_name + '</div>';
            }
          },
          momentum: true,
          displayNum: 3,
          wrapper: this.$('.demo3')
        });
        this.slider2.show();
      },function(e){

      },this);
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {
//      $(window).off('.flex-container');
    }
  });
});
