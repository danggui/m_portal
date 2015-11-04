/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('ViewSalary-detail'),'SalaryStore'],function(View,viewhtml,SalaryStore){
  return _.inherit(View,{
    onCreate: function () {
    },

    events: {
    },

    onPreShow: function (){
      var SalaryStoreIn = SalaryStore.getInstance();
      var title = SalaryStoreIn.getAttr('salary-detail-title');
      var data = JSON.parse(SalaryStoreIn.getAttr('salary-detail-data'));
      this.$el.html(_.template(viewhtml)({'title':title,'data':data}));
      this._initHead();
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
    }
  });
});
