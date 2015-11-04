/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyInfo-detail-position'),'MyInfoDPositionModel','UIGroupList'],function(View,viewhtml,MyInfoDPositionModel,UIGroupList){
  return _.inherit(View,{
    onCreate: function () {
//      var scope = this;
      this.$el.html(viewhtml);

      this.els = {
        company_experience_tpl: this.$el.find("#company_experience_tpl")
      };

      var myInfoDetailPositionModel = MyInfoDPositionModel.getInstance();
      myInfoDetailPositionModel.execute(function(data){
        var demodata3 = [];
        _.each(data.data.experience_info,function(value, key, list){
          var detaildata = [];
          _.each(value.info,function(v,k,l){
            detaildata.push({'gname': v.title, 'name': v.value});
          });
          //background: url(\'images/personal/red_belt.png\')
          demodata3.push(MyInfoDPositionModel.viewMenuInfoModel('',value.time_span,'',detaildata,'table','<div style="padding: 5px 0;text-align: center;background-color:#b70707"><span style="background-color: #FFF;color:#e51700;border-radius:2px;padding: 5px;">-'+value.transfer+'-'+value.transfer_date+'</span></div>'));
        });

        this.$("#company_experience_wrap").html(_.template(this.els.company_experience_tpl.html())({'company_experience_data':data.data.company_experience}));

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
