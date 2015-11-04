/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyApply_List'),'MyApplyListModel','UIScroll'],function(View,viewhtml,MyApplyListModel,UIScroll){
  return _.inherit(View,{
    onCreate: function () {
//      var scope = this;
      this.$el.html(viewhtml);
      this.els = {
        myapplyList_tpl: this.$el.find("#myapplyList_tpl")
      };
      var myApplyListModel = MyApplyListModel.getInstance();
      myApplyListModel.execute(function(data){

        this.$("#scroller").append(_.template(this.els.myapplyList_tpl.html())({'myapply_list_data':data.data}));

        this.scroll = new UIScroll({
          wrapper: this.$("#myapplyList_wrap"),
          scroller: this.$("#scroller"),
          step:200,
          onScrollMove: function() {
            console.log('move');
          },
          onScrollEnd: function() {
            console.log('end');
          }
        });
      },function(e){

      },this);
    },

    events: {
      'click #apply_leave': function(){
        this.forward('MyBalance_apply');
      }
    },

    onPreShow: function (){
      this.turning();
    },

    onShow: function () {
      if (this.scroll && this.scroll.refresh) this.scroll.refresh();
    },

    onHide: function () {
    }
  });
});
