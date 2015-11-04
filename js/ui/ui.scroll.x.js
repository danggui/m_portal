/**
 * Created by Patrick.Fang on 2014/10/8.
 */
define(['UIScroll'], function (UIScroll) {
  return _.inherit({
    propertys: function(){
      //该组件一定要设置宽高
      this.maxHeight = 560;
      this.sheight = 0;
    },

    setOption: function (options) {
      for (var k in options) {
        this[k] = options[k];
      }
    },

    initWrapper: function () {
      var h = 0;
      this.sheight = this.scroller.height();
      this.swidth = this.scroller.width();
      h = Math.min(this.sheight, this.maxHeight);
      this.swrapper.height(h);
      this.swrapper.width('90%');
      this.scroller.width(this.swidth+15);
    },

    _initScroll: function () {
      if (this.scroll) {
        this.scroll.destroy();
      }

      this.scroll = new UIScroll({
        wrapper: this.swrapper,
        scroller: this.scroller,
        scrollType: 'x',
        step:100,
        scrollbars:false,
        bounce:false
      });
    },

    initialize: function (opts) {
      this.propertys();
      this.setOption(opts);
      this.initWrapper();
      this._initScroll();
    }
  })
});
