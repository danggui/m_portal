define(['View', getGuideViewTemplatePath('bubble.layer'), 'UIBubbleLayer','UIScrollX'], function (View, viewhtml, UIBubbleLayer,UIScrollX) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    initElement: function () {
      $(".wscroller").each(function(i,obj){
        new UIScrollX({
          swrapper:$(obj),
          scroller:$(obj).find(".sscroller")
        });
      });
    },

    events: {
      'click .demo1': 'demo1Action'
    },

    demo1Action: function(e) {
      if(!this.demo1) {
        var data = [{ name: '22' },
          { name: '222' },
          { name: '2222' },
          { name: '22222'}],
        scope = this;


        var el = $(e.currentTarget);
        var index = parseInt(Math.random() * 4);
        var dir = (e.clientY > 200) ? 'down' : 'up';
        this.demo1 = new UIBubbleLayer({
          triggerEl: el,
          datamodel: {
            data: data,
            dir: dir,
            index: index
          },
          width: 200,
          needMask:true,
          onClick:  function (e, data, index, el) {
            console.log(arguments);
            this.setIndex(index);
            scope.$('.demo-input1').val(data.name);
            this.hide();
          }
        });
      }
      this.demo1.show();
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      this.initElement();
    },

    onHide: function () {
      if(this.demo1 && this.demo1.status == 'show') this.demo1.hide();
    }
  });
});
