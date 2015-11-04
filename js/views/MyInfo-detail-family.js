/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyInfo-detail-family'),'MyInfoDFamilyModel','UIGroupList'],function(View,viewhtml,MyInfoDFamilyModel,UIGroupList){
  return _.inherit(View,{
    onCreate: function () {
//      var scope = this;
      this.$el.html(viewhtml);

      var myInfoDFamilyModel = MyInfoDFamilyModel.getInstance();
      myInfoDFamilyModel.execute(function(data){
        var demodata3 = [];
        _.each(data.data.family_info,function(value, key, list){
          var detaildata = [];
          _.each(value.info,function(v,k,l){
            detaildata.push({'gname': v.title, 'name': v.value});
          });
          demodata3.push(MyInfoDFamilyModel.viewMenuInfoModel('',value.title,'',detaildata,'table'));
        });

        this.grouplist1 = new UIGroupList({
          datamodel: {
            data: demodata3
          },
          wrapper: this.$('.wrapper1')
        });
        this.grouplist1.show();
      },function(e){

      },this);
    },

    events: {
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
