define(['View',getViewTemplatePath('News_Detail'),'UIScroll','NewsDetailModel','LanguageStore'],function(View,viewhtml,UIScroll,NewsDetailModel,LanguageStore){
    var lanStore = LanguageStore.getInstance(),
         newsDetailModel = NewsDetailModel.getInstance(),
         news_Detail_data = news_Detail_data||[],
         newsId = location.href.substring(location.href.indexOf("&")+1,location.href.length);
  return _.inherit(View,{
    onCreate: function () {
//      var scope = this;
      this.$el.html(viewhtml);

        $('#newsdetail-title')[0].innerHTML = lanStore.getAttr('language').newsdetail;

      this.els = {
        newsDetail_tpl: this.$el.find("#newsDetail_tpl")
      };

//      var news_Detail_data =
//        {
//          "img":'images/news/newsDetail_default.png',
//          "img_desc":'KFC owner Yum Brands lowers its full year profit for the second time due to a slower recovery in its Chinese business',
//          "title":'The owner of KFC and Pizza Hut restaurants, Yum Brands, has once again slashed its profit forecast for the year, due to slower sales in China.',
//          "content":'The US company said its full year profit growth would be in the "mid-single-digit" percentage, down from the 10% it had forecast in October.<br/>Earlier in the year, the firm had predicted growth of at least 20%.<br>The group has been hurt by a slower than expected sales recovery in China after a food safety scandal in July.<br>Customers in Yum\'s biggest market became weary of eating at its KFC restaurants, after the brand was linked to supplier Shanghai Husi Food, which was accused of selling old meat.<br>KFC, along with fast food giant McDonald\'s, stopped using meat from the supplier after its operations were suspended in July.'
//        };
    },

    events: {
      'click #self_service':'self_service',
      'click #myinfo':'myinfo',
      'click #fq':'fq'
    },

    self_service: function(){
      this.forward('MyProfile');
    },

    myinfo: function(){
      this.forward('MyInfo');
    },

    fq: function(){
      this.forward('FAQ');
    },

    onPreShow: function (){


            this.$("#scroller").children().remove();
            newsDetailModel.execute(
                function(datamodel,data,textStatus,resObj) {
                    if(data.status == "0"){
                        this.toast1.showToast(data.message);
                        return false;
                    }else{
                        news_Detail_data.push(NewsDetailModel.viewModel(data.data.img?data.data.img:"images/news/news_default_"+lanStore.getAttr('language').languageFlag+".png",data.data.title,data.data.content));
                        this.$("#scroller").append(_.template(this.els.newsDetail_tpl.html())({'news_Detail_data':news_Detail_data[news_Detail_data.length-1]}));
                    }
                },
                function(e){
                    console.log(e);
                    //todo with error information
                },
                this,
                function(e){},
                {'news_id':location.href.substring(location.href.indexOf("&")+1,location.href.length)}
            );
        this.turning();

    },

    onShow: function () {
    },

    onHide: function () {
    }
  });
});
