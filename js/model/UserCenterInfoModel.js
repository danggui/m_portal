define(['AbstractModel'],function(AbstractModel){
  var Model= _.inherit(AbstractModel,{

    propertys: function ($super) {
      $super();
      this.url = "micro/platform/getIndexInfo";
//      this.url = "fakedata/user_center_info.json";
      this.param = {};
      this.dataformat = null;
      this.validates = [];
      this.protocol = 'http';
      this.contentType = 'jsonp';
      this.method = 'GET';
//      this.baseurl = {
//        domain: '192.168.101.126:8082',
//        path: ''
//      };
    },
    buildurl: function ($super) {
      $super();
      //alert(window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/')))
        if(window.location.host!=undefined&&window.location.host!='')
            return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
        else
            return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
    }
  });

  //单例模式
  var modelClass = {};

  modelClass.viewBasicInfoModel = function(role_id,po_id,ou_name,ee_head,ee_name,ou_id,sip,ee_id,email,user_id,po_name,client_name,mobile){
    return {
      role_id: role_id,
      po_id: po_id,
      ou_name:ou_name,
      ee_head:ee_head,
      ee_name:ee_name,
      ou_id:ou_id,
      sip:sip,
      ee_id:ee_id,
      email:email,
      user_id:user_id,
      po_name:po_name,
      client_name:client_name,
      mobile:mobile
    }
  };

  modelClass.viewMenuInfoModel = function(id,text,children){
    var mapMenu = [
      {'id':'01','url':'MyInfo'},
      {'id':'02','url':'ViewSalary'},
      {'id':'03','url':'MyWork_calander'},
      {'id':'04','url':'MyBalance'},
      {'id':'06','url':'MyApply_List'},
      {'id':'07','url':'MyWork_List'},
      {'id':'08','url':'MyOrganize'},
      {'id':'09','url':'MyWork_calander'},
      {'id':'10','url':'Policy'},
      {'id':'12','url':'MyDashboard'}],url='';
    _.each(mapMenu,function(value){
      if(value.id == id)
        url = value.url;
    });
    return {
      id: id,
      text: text,
      url:url,
      children:children
    }
  };
  return modelClass.getInstance = function(){
    return this.instance instanceof Model ? this.instance: this.instance = new Model()
  },modelClass.createInstance = function(){
    return new Model();
  },modelClass;
});
