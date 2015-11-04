define(['View',getViewTemplatePath('News_List'),'UIToast','UIScroll','NewsListModel','LanguageStore'],function(View,viewhtml,UIToast,UIScroll,NewsListModel,LanguageStore){
    var lanStore = LanguageStore.getInstance();
  return _.inherit(View,{
    onCreate: function () {
      var scope = this;
      this.$el.html(viewhtml);

        $('#newlist-title')[0].innerHTML = lanStore.getAttr('language').news;

      this.els = {
        newsList_tpl: this.$el.find("#newsList_tpl")
      };

        if (!this.toast1) {
            this.toast1 = new UIToast({
                datamodel: {
                    content: 'content'
                },
                TIMERRES :  true
            });
        }

        this.getNews();


        var pullDownEl = scope.$("#pullDown")[0];
        var pullDownOffset = pullDownEl.offsetHeight;
        pullDownEl.querySelector('.pullDownLabel').innerHTML =lanStore.getAttr('language').pullDownRefresh01;
      this.scroll = new UIScroll({
        wrapper: this.$("#newsList_wrap"),
        scroller: this.$("#scroller"),
          topOffset: pullDownOffset,
          onRefresh: function () {
              if (pullDownEl.className.match('loading')) {
                  pullDownEl.className = '';
                  pullDownEl.querySelector('.pullDownLabel').innerHTML =lanStore.getAttr('language').pullDownRefresh01;
              }
          },
          onScrollMove: function() {
              if (this.y > 5 && !pullDownEl.className.match('flip')) {
                  pullDownEl.className = 'flip';
                  pullDownEl.querySelector('.pullDownLabel').innerHTML = lanStore.getAttr('language').pullDownRefresh02;
                  this.minScrollY = 0;
              } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                  pullDownEl.className = '';
                  pullDownEl.querySelector('.pullDownLabel').innerHTML =lanStore.getAttr('language').pullDownRefresh01;
                  this.minScrollY = -pullDownOffset;
              }
          },
          onScrollEnd: function() {
              if (pullDownEl.className.match('flip')) {
                  pullDownEl.className = 'loading';
                  pullDownEl.querySelector('.pullDownLabel').innerHTML =lanStore.getAttr('language').pullDownRefresh03;
                  $("#scroller ul").remove();
                  scope.getNews();
              }
          }
      });
    },

    events: {
      'touchstart .newsList': function(e){
            $(e.currentTarget).addClass('cur');
        },
        'touchend .newsList': function(e){
            $(e.currentTarget).removeClass('cur');
        },
        'touchcancel .newsList': function(e){
            $(e.currentTarget).removeClass('cur');
        },
        'click .newsList':function(e){
            this.forward('News_Detail&'+e.currentTarget.attributes["news-id"].value);
        },
      'click #apply_leave': function(){
        this.forward('MyBalance_apply');
      },
      'click #self_service':'self_service',
      'click #myinfo':'myinfo',
      'click #fq':'fq'
    },

      getNews:function(){
          var newsListData = newsListData ||[];
          var newsListModel = NewsListModel.getInstance();
          newsListModel.execute(
              function(data) {
                  if(data.status == "0"){
                      this.toast1.showToast(data.message);
                      return false;
                  }else{
                      _.each(data.data,function(value, key, list){
                          newsListData.push(NewsListModel.viewModel(value.detail_id,value.img?value.img:"images/news/news_default_"+lanStore.getAttr('language').languageFlag+".png",value.title,value.content));
                      });

                      this.$("#scroller").append(_.template(this.els.newsList_tpl.html())({'news_list_data':newsListData}));

                      this.refreshHeight()
                  }
              },
              function(e){
                  console.log(e);
                  //todo with error information
              },
              this,
              function(e){},
              {}
          );
      },

      refreshHeight:function(){
          if (this.scroll && this.scroll.refresh)
          {this.scroll.refresh()};
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

    detailnews: function(){
      this.forward('News_Detail?');
    },

    onPreShow: function (){
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
    }
  });
});
