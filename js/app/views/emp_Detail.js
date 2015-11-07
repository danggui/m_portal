define(["View",getViewTemplatePath("empDetail"),"MyInfoModel","HRempDetailModel","MyInfoDetailListStore","MyProfileStore","UILoading","UIToast","LanguageStore","UIRadioList","MyInfoSaveModel"],function(a,b,c,d,e,f,g,h,i,j,k){var l=c.getInstance(),m=i.getInstance(),n=k.getInstance(),o=d.getInstance(),p=location.href.substring(location.href.indexOf("&")+1,location.href.length),q=[{Iden_type:"p_1",Iden_name:"身份证"},{Iden_type:"p_2",Iden_name:"护照"},{Iden_type:"p_3",Iden_name:"就业许可证"},{Iden_type:"p_4",Iden_name:"港澳通行证"},{Iden_type:"p_5",Iden_name:"居留许可证"},{Iden_type:"p_6",Iden_name:"台胞证"},{Iden_type:"p_7",Iden_name:"港澳居民来往内地通行证"},{Iden_type:"p_8",Iden_name:"残疾证"},{Iden_type:"p_8",Iden_name:"军官证"},{Iden_type:"p_8",Iden_name:"回乡证"}],r=[{Iden_type:"p_1",Iden_name:"Identity Card"},{Iden_type:"p_2",Iden_name:"Passport"},{Iden_type:"p_3",Iden_name:"Employment Permit"},{Iden_type:"p_4",Iden_name:"EEP"},{Iden_type:"p_5",Iden_name:"Residence Permit"},{Iden_type:"p_6",Iden_name:"MTP"},{Iden_type:"p_7",Iden_name:"Travel Permit For Residents of Hongkong & Macau to Mainland China"},{Iden_type:"p_8",Iden_name:"Certificate of Disability"},{Iden_type:"p_8",Iden_name:"Military Officer"},{Iden_type:"p_8",Iden_name:"Reentry Permit"}],s=[{MS_id:"p_1",MS_name:"单身"},{MS_id:"p_2",MS_name:"已婚"},{MS_id:"p_3",MS_name:"离异"},{MS_id:"p_4",MS_name:"丧偶"},{MS_id:"p_5",MS_name:"分居"}],t=[{MS_id:"p_1",MS_name:"Single"},{MS_id:"p_2",MS_name:"Married"},{MS_id:"p_3",MS_name:"Divorce"},{MS_id:"p_4",MS_name:"Widowed"},{MS_id:"p_5",MS_name:"Separation"}];return _.inherit(a,{onCreate:function(){this.$el.html(b),this.toast1||(this.toast1=new h({datamodel:{content:"content"},TIMERRES:!0})),$("#myinfo-title")[0].innerHTML=m.getAttr("language").myInfo,$("#myinfo-sub-title")[0].innerHTML=m.getAttr("language").myInfoSub,this.loading1||(this.loading1=new g({maskToHide:!0})),this.loading1.show();var a=f.getInstance();JSON.parse(a.getAttr("myProfileStore"));this.els={photoInfo_tp1:this.$el.find("#photo_info_tpl"),basicInfo_tpl:this.$el.find("#mybasic_info_tpl"),OutLineInfo_tpl:this.$el.find("#outline_info_tpl")},o.execute(function(a){return"0"==a.status?(this.toast1.showToast(a.message),!1):void 0},function(a){0},this,function(a){},{ee_id:p}),l.execute(function(a){var b=[],c=[];_.each(a.data.ee_card,function(a,d,e){"photo"==a.code?b.push({title:a.title,value:a.value,code:a.code,editable:a.editable}):c.push({title:a.title,value:a.value,code:a.code,editable:a.editable})}),$("#photo_info_wrap").html(_.template(this.els.photoInfo_tp1.html())({photo_infoData:b[0]})),$("#mybasic_info_wrap").html(_.template(this.els.basicInfo_tpl.html())({basic_infoData:c})),$("#outline_info_wrap").html(_.template(this.els.OutLineInfo_tpl.html())({data:a.data.ee_info}))},function(a){},this,function(){},{}),this.loading1.hide()},initialize:function($super,a,b){$super(a,b)},events:{"click .icon_menu":function(){this.forward("MyInfo-detailList")},"click #headPortrait":"changeHeadPortrait","click .myInfo-edit-detail":"myInfoEdit"},myInfoEdit:function(a){localStorage.setItem("myInfoEditTitle",a.currentTarget.getAttribute("data-title")),localStorage.setItem("myInfoEditID",a.currentTarget.getAttribute("data-id")),localStorage.setItem("myInfoEditValue",$("#"+a.currentTarget.getAttribute("data-id")+"_value").text().trim()),"iden_type"==a.currentTarget.getAttribute("data-id")?this.selectIdenType():"marriage_status"==a.currentTarget.getAttribute("data-id")?this.selectMaritalStatus():this.forward("myInfoEditDetail")},selectMaritalStatus:function(){var a=[],b=this;this.selectMSType_radio||("zh_cn"==m.getAttr("language").languageFlag?_.each(s,function(b,c,d){a.push({id:b.MS_id,name:b.MS_name})}):_.each(t,function(b,c,d){a.push({id:b.MS_id,name:b.MS_name})}),this.selectMSType_radio=new j({datamodel:{title:m.getAttr("language").selectDocuments,data:a},displayNum:5,selectId:4,index:4,onClick:function(a,c){if(this.hide(),c.name!=localStorage.getItem("myInfoEditValue")){var d=c;b.saveMS(d)}}})),this.selectMSType_radio.show()},saveMS:function(a){n.execute(function(b,c,d,e){return"0"==c.status?!1:($("#"+localStorage.getItem("myInfoEditID")).children(".pull-right").text(a.name),void localStorage.setItem("myInfoEditValue",a.name))},function(a){0},this,function(a){},{marriage_status:a.id})},selectIdenType:function(){var a=[],b=this;this.selectIdenType_radio||("zh_cn"==m.getAttr("language").languageFlag?_.each(q,function(b,c,d){a.push({id:b.Iden_type,name:b.Iden_name})}):_.each(r,function(b,c,d){a.push({id:b.Iden_type,name:b.Iden_name})}),this.selectIdenType_radio=new j({datamodel:{title:m.getAttr("language").selectDocuments,data:a},displayNum:5,selectId:4,index:4,onClick:function(a,c){if(this.hide(),c.name!=localStorage.getItem("myInfoEditValue")){var d=c;b.saveIdenInfo(d)}}})),this.selectIdenType_radio.show()},saveIdenInfo:function(a){n.execute(function(b,c,d,e){return"0"==c.status?!1:($("#"+localStorage.getItem("myInfoEditID")).children(".pull-right").text(a.name),void localStorage.setItem("myInfoEditValue",a.name))},function(a){0},this,function(a){},{iden_type:a.id})},changeHeadPortrait:function(a){localStorage.setItem("myInfoEditTitle","phone"),localStorage.setItem("myInfoEditID",a.currentTarget.getAttribute("id")),localStorage.setItem("myInfoEditValue",a.currentTarget.getAttribute("src")),this.forward("changeHeadPortrait")},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});