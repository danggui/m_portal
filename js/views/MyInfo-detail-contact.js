/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyInfo-detail-droplist'),'MyInfoDContactModel','UIGroupList'],function(View,viewhtml,MyInfoDContactModel,UIGroupList){
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(_.template(viewhtml)({'title':'通讯'}));
    },

    events: {
    },

    initialize: function ($super, app, id) {

      $super(app, id);
    },
    onPreShow: function (){
      if (!this.grouplist1) {
        var myInfoDContactModel = MyInfoDContactModel.getInstance();
        myInfoDContactModel.execute(function (data) {
          var demodata3 = [];
          _.each(data.data, function (value, key, list) {
            var detaildata = [];
            _.each(value.info, function (v, k, l) {
              detaildata.push({'gname': v.title, 'name': v.value});
            });
            demodata3.push(MyInfoDContactModel.viewMenuInfoModel('', value.title, '', detaildata));
          });
          this.grouplist1 = new UIGroupList({
            datamodel: {
              data: demodata3
            },
            wrapper: this.$('.wrapper1')
          });
          this.grouplist1.show();
        }, function (e) {

        }, this);
      }
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
    }
  });
});
