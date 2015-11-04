define(['AbstractModel'],function(AbstractModel){
  var Model= _.inherit(AbstractModel,{

    propertys: function ($super) {
      $super();
      this.url = "fakedata/salary_data.json";
      this.param = {};
      this.dataformat = null;
      this.validates = [];
      this.protocol = 'http';
      this.contentType = 'json';
      this.method = 'POST';

//      this.baseurl = {
//        domain: '',
//        path: ''
//      };
    },
    buildurl: function ($super) {
        $super();
//      alert(window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/')))
      if(this.baseurl.domain=='')
        this.baseurl.domain = window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/'));
      if(window.location.host!=undefined&&window.location.host!='')
        return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
      else
          return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
    }
  });

  //单例模式
  var modelClass = {};

  modelClass.viewModel = function(gname,name,content,data,directUrl){
//    { gname:'ViewSalary-detail',name: '基本工资',content:'7800.00CNY', data: [],directUrl:true },
    return {
      gname: gname,
      name: name,
      content:content,
      data:data,
      directUrl:directUrl
    }
  };

  return modelClass.getInstance = function(){
    return this.instance instanceof Model ? this.instance: this.instance = new Model()
  },modelClass.createInstance = function(){
    return new Model();
  },modelClass;
});
