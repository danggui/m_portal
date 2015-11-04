define(['AbstractModel'],function(AbstractModel){
    var Model= _.inherit(AbstractModel,{

        propertys: function ($super) {
            $super();
            this.url = "micro/tm/doLeaveApply";
            this.param = {};
            this.dataformat = null;
            this.validates = [];
            this.protocol = 'http';
            this.contentType = 'jsonp';
            this.method = 'GET';

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
    var modelClass = {};

    modelClass.viewModel = function(type,a_date,s_date,s_time,e_date,e_time,days,reason){
        return {
            type: type,
            a_date:a_date,
            s_date:s_date,
            s_time:s_time,
            e_date:e_date,
            e_time:e_time,
            days:days,
            reason:reason
        }
    };

    return modelClass.getInstance = function(){
        return this.instance instanceof Model ? this.instance: this.instance = new Model()
    },modelClass.createInstance = function(){
        return new Model();
    },modelClass;
});
