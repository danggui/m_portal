/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('FAQ'),'UIGroupList'], function (View, viewhtml,UIGroupList) {
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(_.template(viewhtml)({'title':'F&Q'}));
    },

    events: {

    },

    onPreShow: function () {
      if (!this.grouplist1) {
        var demodata3 = [
          { name: '密码设置规则', data:
            [{'content':'1.不少于6位'},
            {'content':'2.包含大写字母'},
            {'content':'3.包含小写字母'},
            {'content':'4.包含数字'}]
          }
        ];
        this.grouplist1 = new UIGroupList({
          datamodel: {
            data: demodata3
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
