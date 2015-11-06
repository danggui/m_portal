define(['AbstractModel'],function(AbstractModel){
    var Model= _.inherit(AbstractModel,{

        propertys: function ($super) {
            $super();
            this.url = "portal/hr/getEmployeeList";
            this.param = {};
            this.dataformat = null;
            this.validates = [];
            this.protocol = 'http';
            this.contentType = 'jsonp';
            this.method = 'GET';

//            this.baseurl = {
//                domain: '192.168.101.126:8082',
//                path: ''
//            };
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

    //µ¥ÀýÄ£Ê½
    var modelClass = {};

    modelClass.viewModel = function(id,img,title,content){
        return {
            base_id: id,
            photo:img,
            chinese_name:title,
            mobile_phone:content

        }
    };

    return modelClass.getInstance = function(){
        return this.instance instanceof Model ? this.instance: this.instance = new Model()
    },modelClass.createInstance = function(){
        return new Model();
    },modelClass;
});
