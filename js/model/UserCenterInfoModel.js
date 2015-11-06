define(['AbstractModel'],function(AbstractModel){
  var Model= _.inherit(AbstractModel,{

    propertys: function ($super) {
      $super();
      this.url = "portal/platform/getIndexInfo";
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

  modelClass.viewBasicInfoModel = function(content,title,extra,code){
    return {
      content: content,
      title: title,
      extra:extra,
      code:code
    }
  };

  modelClass.viewMenuInfoModel = function(id,text,children){
    var mapMenu = [
      {'id':'01','url':'Employee'},
      {'id':'02','url':'HR'}
    ],url='';
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
