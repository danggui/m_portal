/**
 * Created by Patrick.Fang on 2014/9/12.
 */
define(['View',getViewTemplatePath('pwdProtect'),'UIGroupList'], function (View, viewhtml,UIGroupList) {
  return _.inherit(View,{
    onCreate: function () {
      var scope = this;
      this.$el.html(viewhtml);
      var listdata = [
        { gname:'changePwd',name: '更改密码', data: [],directUrl:true },
        { gname:'PwdProblem',name: '密码问题', data: [],directUrl:true }
      ];
      this.grouplist1 = new UIGroupList({
        datamodel: {
          data:listdata
        },
        onGroupClick: function (index, items, e) {
          scope.forward(this.datamodel.data[index].gname);
        },
        wrapper: this.$('.wrapper')
      });
      this.grouplist1.show();
    },

    events: {
    },
    onPreShow: function () {
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }
  });
});
