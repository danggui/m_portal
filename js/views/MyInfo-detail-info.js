/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyInfo-detail-info'),'MyInfoDInfoModel'],function(View,viewhtml,MyInfoDInfoModel){
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
      this.els = {
        myinfo_detail_info_tpl: this.$el.find("#MyInfo-detail-info")
      };
    },

    events: {
    },

    initialize: function ($super, app, id) {

      $super(app, id);
    },
    onPreShow: function (){
      var myInfoDInfoModel = MyInfoDInfoModel.getInstance();
      myInfoDInfoModel.execute(function(data){
        this.$("#MyInfo-detail-info-wrap").html(_.template(this.els.myinfo_detail_info_tpl.html())({'data':data.data}));
      },function(e){

      },this);
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
    }
  });
});
