define(['UIView',getViewTemplatePath('ui/ui.openFile')],function(UIView,template){
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
        },

        events:{
            'click .trigger': 'itemClickAction',
            'click .triggerLeaf': 'itemleafClickAction'
        },

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
