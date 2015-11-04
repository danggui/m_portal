define(['UIView',getViewTemplatePath('ui/ui.treeMenu'),'UIScroll'],function(UIView,template,UIScroll){
  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //该组件一定要设置宽高
      this.maxHeight = 270;
      this.sheight = 0;

      this.scrollWrapper = null;
      this.scrollScroller = null;

      this.template = template;

      this.datamodel = {
        data: [],
        filter: 'name'
      };

      this.itemClick = function(){

      };

      this.itemleafClick = function(){

      }
    },

    events:{
      'click .trigger': 'itemClickAction',
      'click .triggerLeaf': 'itemleafClickAction'
    },
    // Events
    // onclick(id)
    itemClickAction: function (e) {
      this.itemClick.call(this,e);

      var trigger = $(e.currentTarget);
      if(trigger.attr('target')==''){
        var ul = trigger.next(),
            other = trigger.parent().siblings();
        other.find("ul").hide();
        ul.toggle();

        this.refreshHeight();
        this.scroll.scrollTo(0,0,0);
        if(ul.offset()!=null && ul.offset().top!=0){
          if (this.scroll){
            var lastli = ul.find("li").last();
            this.scroll.scrollTo(0,this.scroll.wrapperH-(lastli.offset().top+lastli.height()),0);
          }
        }
      }
    },

    itemleafClickAction: function (e) {

      this.itemleafClick.call(this,e);
    },

//    initMenuScroller: function(){
//      this.maxHeight = $(window).height();
//      this.initWrapperHeight();
//      this._initScroll();
//    },
//
//    initWrapperHeight: function () {
//      var h = 0;
////      if(this.scrollScroller.height()==0){
////        this.scrollScroller.height(this.maxHeight+300);
////        this.sheight = this.maxHeight;
////      }else
//        this.sheight = this.scrollScroller.height();
//
//      h = Math.min(this.sheight, this.maxHeight);
//      this.scrollWrapper.height(h);
//      //this.scrollWrapper.parent().hide();
//    },

    _initScroll: function () {
      if (this.scroll) {
        try{this.scroll.destroy();}catch(e){}
      }

      this.scroll = new UIScroll({
        hScroll: false,
        vScrollbar: false,
        wrapper: this.scrollWrapper,
        scroller: this.scrollScroller
      });
    },

//    resizeMenuScroller: function(){
////      if(this.scrollWrapper.parent().css('display')=='none'){
////        this.scrollWrapper.parent().show();//菜单隐藏bug修复
////        this.initMenuScroller();
////        this.scrollWrapper.parent().hide();
////      }else{
////        this.initMenuScroller();
////      }
//        this.initMenuScroller();
////        this.refreshHeight();
//    },

    //内部高度变化时要刷新操作
    refreshHeight: function () {
//      this.initWrapperHeight();
//      this._initScroll();
      if (this.scroll && this.scroll.refresh) this.scroll.refresh();
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
//      $(window).on("resize", $.proxy(function(e){
//        if(this.scrollScroller.height()!=0)//当菜单在当前页面时，才重新计算高度
//          this.resizeMenuScroller();
//        //window.location.reload();
//      },this));

      this.on('onShow', function () {
        //this.initMenuScroller();
        this._initScroll();
      }, 1);
    }
  });
});
