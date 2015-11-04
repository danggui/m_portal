define(['View',getViewTemplatePath('MyWork_List'),'MyWorkListModel','UIScroll','LanguageStore'],function(View,viewhtml,MyWorkListModel,UIScroll,LanguageStore){
  var lanStore = LanguageStore.getInstance();
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
      $('#todolist-title')[0].innerHTML = lanStore.getAttr('language').todoList;
    },

    events: {
      'click .filter-icon':'work_menu',
      'click #work_todo':'work_todo',
      'click #work_hint':'work_hint',
      'click #work_notify':'work_notify',
      'click #work_all':'work_all'
    },

    work_menu: function(){
      this.$(".workMenu").hide();
      this.$("#filterMenu").show();
    },

    work_todo: function(){
      var filterdata = _.filter(this.datamodel,function(obj){return obj.type>="0"&&obj.type<="1"});
      this.$("#scoller-wrap").html(_.template(this.els.myworkList_tpl.html())({'mywork_list_data':filterdata}));
      this.$(".head-wrap").html(_.template(this.els.total_tpl.html())({'total_title':'待办事项','total':filterdata.length}));
      this.$(".workMenu").hide();
      this.$("#todoMenu").show();
      this.refreshHeight();
    },

    work_hint: function(){
      var filterdata = _.filter(this.datamodel,function(obj){return obj.type>="2"&&obj.type<="6"});
      this.$("#scoller-wrap").html(_.template(this.els.myworkList_tpl.html())({'mywork_list_data':filterdata}));
      this.$(".head-wrap").html(_.template(this.els.total_tpl.html())({'total_title':'提醒','total':filterdata.length}));
      this.$(".workMenu").hide();
      this.$("#HintMenu").show();
      this.refreshHeight();
    },

    work_notify: function(){
      var filterdata = _.filter(this.datamodel,function(obj){return obj.type>="7"});
      this.$("#scoller-wrap").html(_.template(this.els.myworkList_tpl.html())({'mywork_list_data':filterdata}));
      this.$(".head-wrap").html(_.template(this.els.total_tpl.html())({'total_title':'通知','total':filterdata.length}));
      this.$(".workMenu").hide();
      this.$("#NotifyMenu").show();
      this.refreshHeight();
    },


    wait_apply: function(){
      var filterdata = _.filter(this.datamodel,function(obj){return obj.type>="7"});
      this.$("#scoller-wrap").html(_.template(this.els.myworkList_tpl.html())({'mywork_list_data':filterdata}));
      this.$(".head-wrap").html(_.template(this.els.total_tpl.html())({'total_title':'待审批','total':filterdata.length}));
      this.$(".workMenu").hide();
      this.refreshHeight();
    },


    on_apply: function(){
      var filterdata = _.filter(this.datamodel,function(obj){return obj.type>="7"});
      this.$("#scoller-wrap").html(_.template(this.els.myworkList_tpl.html())({'mywork_list_data':filterdata}));
      this.$(".head-wrap").html(_.template(this.els.total_tpl.html())({'total_title':'审批中','total':filterdata.length}));
      this.$(".workMenu").hide();
      this.refreshHeight();
    },


    has_apply: function(){
      var filterdata = _.filter(this.datamodel,function(obj){return obj.type>="7"});
      this.$("#scoller-wrap").html(_.template(this.els.myworkList_tpl.html())({'mywork_list_data':filterdata}));
      this.$(".head-wrap").html(_.template(this.els.total_tpl.html())({'total_title':'已审批','total':filterdata.length}));
      this.$(".workMenu").hide();
      this.refreshHeight();
    },

    work_all: function(){
      this.$("#scoller-wrap").html(_.template(this.els.myworkList_tpl.html())({'mywork_list_data':this.datamodel}));
      this.$(".head-wrap").html(_.template(this.els.total_tpl.html())({'total_title':'','total':this.datamodel.length}));
      this.$(".workMenu").hide();
      this.$("#filterMenu").show();
      this.refreshHeight();
    },

    onPreShow: function (){
      this.turning();
    },

    onShow: function () {
      this.queryData();
      var scope = this;
      var pullDownEl = scope.$("#pullDown")[0];
      var pullDownOffset = pullDownEl.offsetHeight;
//      document.removeEventListener("touchmove", function (e) { e.preventDefault(); });
//      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      if(!this.scroll){
        this.scroll = new UIScroll({
          wrapper: this.$("#myworkList_wrap"),
          scroller: this.$("#scroller"),
          topOffset: pullDownOffset,
          onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
              pullDownEl.className = '';
              pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            }
          },
          onScrollMove: function() {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
              pullDownEl.className = 'flip';
              pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
              this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
              pullDownEl.className = '';
              pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
              this.minScrollY = -pullDownOffset;
            }
          },
          onScrollEnd: function() {
            if (pullDownEl.className.match('flip')) {
              pullDownEl.className = 'loading';
              pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
              scope.queryData();
            }
          }
        });
      }
      this.refreshHeight();
    },

    queryData: function () {
      var myWorkListModel = MyWorkListModel.getInstance();
      myWorkListModel.execute(function(data){
        this.datamodel = data.data;
        if(location.href.lastIndexOf('!')+1>0){
          var method = location.href.substring(location.href.lastIndexOf('!')+1,location.href.length);
          switch(method){
          case 'work_todo':
            this.work_todo();
            break;
          case 'work_hint':
            this.work_hint();
            break;
          case 'on_apply':
            this.on_apply();
            break;
          case 'wait_apply':
            this.wait_apply();
            break;
          case 'has_apply':
            this.has_apply();
            break;
          case 'work_notify':
            this.work_notify();
            break;
          default :
            this.work_all();
            break;
          }
        }else{
          this.work_all();
        }

      },function(e){

      },this);
    },

    refreshHeight: function(){
      if (this.scroll && this.scroll.refresh) this.scroll.refresh();
    },

    onHide: function () {
//      document.removeEventListener("touchmove", function (e) { e.preventDefault(); });
    }
  });
});
