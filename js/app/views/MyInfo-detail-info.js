define(["View",getViewTemplatePath("MyInfo-detail-info"),"MyInfoDInfoModel"],function(a,b,c){return _.inherit(a,{onCreate:function(){this.$el.html(b),this.els={myinfo_detail_info_tpl:this.$el.find("#MyInfo-detail-info")}},events:{},initialize:function($super,a,b){$super(a,b)},onPreShow:function(){var a=c.getInstance();a.execute(function(a){this.$("#MyInfo-detail-info-wrap").html(_.template(this.els.myinfo_detail_info_tpl.html())({data:a.data}))},function(){},this),this.turning()},onShow:function(){},onHide:function(){}})});