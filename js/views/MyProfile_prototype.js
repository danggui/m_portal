/**
 * Created by Patrick.Fang on 2014/9/17.
 */
define(['NavView',getViewTemplatePath('MyProfile'),'UItreeMenu','treeMenuModel','UISlide','UITab'], function (View, viewhtml,UItreeMenu,treeMenuModel,UISlide,UITab) {
  var menuModel = treeMenuModel.getInstance();
  return _.inherit(View,{
    propertys: function ($super) {
      $super();
    },

    onCreate: function () {
      this.$el.html(viewhtml);
      this.$('.ct-main-content').empty();
      var that = this;

      menuModel.execute(
        function(data){
          var myprofile_data = data;
          this.tree_menu = new UItreeMenu({
            datamodel: {
              data: myprofile_data.nodeList
            },

            wrapper: this.$(".ct-main-content"),

            scrollWrapper: this.$('.ct-bg'),

            scrollScroller: this.$(".ct-main-content"),

            itemClick: function (e) {
              var trigger = $(e.currentTarget);
              if(trigger.attr('target')!=''){
                $('body').toggleClass("overflow-h");
                $('#main').toggleClass("overflow-h");
                that.forward(trigger.attr('target'))
              }
            },

            // Load page
            itemleafClick: function (e){
              if($(e.target).attr('target')!=''){
                that.forward($(e.target).attr('target'))
              }
            }
          });
          this.tree_menu.show();
          this.$('.ct-main_menu').hide();
          $('body').removeClass("overflow-h");
          $('#main').removeClass("overflow-h");
        },
        function(e){
          //todo with error information
        },
        this
      );

      if(!this.tab1) {
        this.tab1 = new UITab({
          datamodel: {
            data: [
              { id: 1, name: '最新消息' },
              { id: 2, name: '我的菜单' }
            ],
            curClass: 'ct-ui-tab-current',
            index: 0
          },
          onChange: function() {
            that.$(".tabcontent").hide();
            that.$("#content"+this.el.attr('data-key')).show();
          },
          wrapper: this.$el.find('.wrapper1')
        });
        this.tab1.show();
      }
      this.setAndShowTopAds();
    },

    events: {
      'click .icon_menu': function () {
        this.$(".ct-main_menu").toggle();
        this.$(".ct-main_a").toggleClass("ct-main");
        $('body').toggleClass("overflow-h");
        $('#main').toggleClass("overflow-h");
      },
      'click #viewSalary': function(){
        this.forward("ViewSalary");
      }
    },

    onPreShow: function () {
      //_initScroll();
      this.turning();
    },

    onShow: function () {
      //如果菜单栏打开高度滚动关闭
      if(this.$('.ct-main_menu').css('display')!='none'){
        $('body').addClass("overflow-h");
        $('#main').addClass("overflow-h");
      }
    },

    setAndShowTopAds: function() {
      var e = this.$('.J_imageSlider img');
      this.$el.find(".J_imageSlider").html("");
      for (var t = [], n = null, r = 0, i = e.length; r < Math.min(i, 10); r++) n = e[r],
        t.push({
        link: 'guide.html#controls',
        title: r+'test222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
        src: $(n).attr('src')
      });
      var s = this;
      this.slider = new UISlide({
        images: t,
        container: s.$el.find(".J_imageSlider"),
        dir: "LEFT",
        index: 0,
        noNeedDefault: "false",
        autoPlay: 0,
        loop: !0,
        showNav: 1,
        onImageClick: $.proxy(function() {
            var e = this.slider.index;
            if (t[e]) {
              var n = t[e].link;
              window.location = n;
            }
          },
          this)
      });
      this.slider.play();
    },

    onHide: function () {

    }
  });
});
