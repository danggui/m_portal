define(["View",getViewTemplatePath("News_List"),"UIToast","UIScroll","NewsListModel","LanguageStore"],function(a,b,c,d,e,f){var g=f.getInstance();return _.inherit(a,{onCreate:function(){var a=this;this.$el.html(b),$("#newlist-title")[0].innerHTML=g.getAttr("language").news,this.els={newsList_tpl:this.$el.find("#newsList_tpl")},this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0})),this.getNews();var e=a.$("#pullDown")[0],f=e.offsetHeight;e.querySelector(".pullDownLabel").innerHTML=g.getAttr("language").pullDownRefresh01,this.scroll=new d({wrapper:this.$("#newsList_wrap"),scroller:this.$("#scroller"),topOffset:f,onRefresh:function(){e.className.match("loading")&&(e.className="",e.querySelector(".pullDownLabel").innerHTML=g.getAttr("language").pullDownRefresh01)},onScrollMove:function(){this.y>5&&!e.className.match("flip")?(e.className="flip",e.querySelector(".pullDownLabel").innerHTML=g.getAttr("language").pullDownRefresh02,this.minScrollY=0):this.y<5&&e.className.match("flip")&&(e.className="",e.querySelector(".pullDownLabel").innerHTML=g.getAttr("language").pullDownRefresh01,this.minScrollY=-f)},onScrollEnd:function(){e.className.match("flip")&&(e.className="loading",e.querySelector(".pullDownLabel").innerHTML=g.getAttr("language").pullDownRefresh03,$("#scroller ul").remove(),a.getNews())}})},events:{"touchstart .newsList":function(a){$(a.currentTarget).addClass("cur")},"touchend .newsList":function(a){$(a.currentTarget).removeClass("cur")},"touchcancel .newsList":function(a){$(a.currentTarget).removeClass("cur")},"click .newsList":function(a){this.forward("News_Detail&"+a.currentTarget.attributes["news-id"].value)},"click #apply_leave":function(){this.forward("MyBalance_apply")},"click #self_service":"self_service","click #myinfo":"myinfo","click #fq":"fq"},getNews:function(){var a=a||[],b=e.getInstance();b.execute(function(b){return"0"==b.status?(this.toast1.showToast(b.message),!1):(_.each(b.data,function(b){a.push(e.viewModel(b.detail_id,b.img?b.img:"images/news/news_default_"+g.getAttr("language").languageFlag+".png",b.title,b.content))}),this.$("#scroller").append(_.template(this.els.newsList_tpl.html())({news_list_data:a})),this.refreshHeight(),void 0)},function(a){0},this,function(){},{})},refreshHeight:function(){this.scroll&&this.scroll.refresh&&this.scroll.refresh()},self_service:function(){this.forward("MyProfile")},myinfo:function(){this.forward("MyInfo")},fq:function(){this.forward("FAQ")},detailnews:function(){this.forward("News_Detail?")},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});