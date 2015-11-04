/**
 * Created by Lance.Zhao on 2015/3/20.
 */
define(['View',getViewTemplatePath('policy'),'PolicyModel','UISlide','LanguageStore'], function (View, viewhtml,PolicyModel,UISlide,LanguageStore) {
  var lanStore = LanguageStore.getInstance();
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
      $('#policy-title')[0].innerHTML = lanStore.getAttr('language').policy;
      var policyModel = PolicyModel.getInstance();
      policyModel.execute(function(data){
          var t = [];
          _.each(data.data,function(value, key, list){
            t.push(PolicyModel.viewAdModel('',value.title,'',value.content));
          });
          this.setAndShowTopAds(t);
        },
        function(e){
          console.log(e);
          //todo with error information
        },
        this);
    },

    setAndShowTopAds: function(t) {
//      var e = this.$('.J_imageSlider img');
      this.$el.find(".J_imageSlider").html("");
//      for (var t = [], n = null, r = 0, i = e.length; r < Math.min(i, 10); r++) n = e[r],
//        t.push({
//        link: 'guide.html#controls',
//        title: r+'test222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
//        src: $(n).attr('src')
//      });
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
          },
          this)
      });
      this.slider.play();
    },

    events: {
    },
    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      if(this.slider) this.slider._resize();
    },

    onHide: function () {

    }
  });
});
