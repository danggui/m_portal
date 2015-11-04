/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyBalance_detail'),'MyBalanceDetailModel'],function(View,viewhtml,MyBalanceDetailModel){
  return _.inherit(View,{
    onCreate: function () {
//      var scope = this;
      this.$el.html(viewhtml);

      this.els = {
        balance_detail_tpl: this.$el.find("#balance_detail_tpl"),
        balance_approve_tpl: this.$el.find("#balance_approve_tpl"),
        balance_attach_tpl: this.$el.find("#balance_attach_tpl")
      };

      var myBalanceDetailModel = MyBalanceDetailModel.getInstance();
      myBalanceDetailModel.execute(function(data){

        this.$("#balance_detail_wrap").html(_.template(this.els.balance_detail_tpl.html())({'ee_card':data.data.ee_card,'app_record':data.data.app_record}));
        this.$("#balance_approve_wrap").html(_.template(this.els.balance_approve_tpl.html())({'approvaldata':data.data.approval}));

        this.$("#balance_attach_wrap").html(_.template(this.els.balance_attach_tpl.html())({'attachmentdata':data.data.attachment}));
      },function(e){

      },this);
    },

    events: {
      'click .Ct_image_attach':'imageview'
    },

    imageview: function(e){
      var imageItem = $(e.currentTarget).attr("data-value");
      window.location.href= 'imageView.html?path='+encodeURIComponent(imageItem);
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
