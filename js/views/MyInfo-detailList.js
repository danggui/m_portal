/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyInfo-detailList'),'MyInfoDListModel','MyInfoDetailListStore','UIGroupList'],function(View,viewhtml,MyInfoDListModel,MyInfoDetailListStore,UIGroupList){
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
    },

    onPreShow: function (){
      var scope = this;
      if (!this.grouplist1) {
        var myInfoDlStore = MyInfoDetailListStore.getInstance();
        var data = JSON.parse(myInfoDlStore.getAttr('myinfo-detail-list'));


        var demodata3 = [];
        _.each(data, function (value, key, list) {
          demodata3.push(MyInfoDListModel.viewMenuInfoModel(value.id, value.class, '', [], true));
        });
        this.grouplist1 = new UIGroupList({
          datamodel: {
            data: demodata3
          },
          onGroupClick: function (index, items, e) {
            scope.forward(this.datamodel.data[index].gname);
          },
          wrapper: this.$('.wrapper1')
        });
        this.grouplist1.show();
      }
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
    }
  });
});
