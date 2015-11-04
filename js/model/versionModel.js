define(['AbstractModel'],function(AbstractModel){
    var Model= _.inherit(AbstractModel,{

        propertys: function ($super) {
            $super();
            this.url = "/micro/platform/getUpgradeInfo";
            this.param = {};
            this.dataformat = null;
            this.validates = [];
            this.protocol = 'http';
            this.contentType = 'jsonp';
            this.method = 'GET';
        },
        buildurl: function ($super) {
            $super();
            if(window.location.host!=undefined&&window.location.host!='')
                return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
            else
                return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
        }
    });

    var modelClass = {};

    modelClass.viewAdModel = function(must_upgrade,version){
        return {
            must_upgrade: must_upgrade,
            version: version
        }
    };

    return modelClass.getInstance = function(){
        return this.instance instanceof Model ? this.instance: this.instance = new Model()
    },modelClass.createInstance = function(){
        return new Model();
    },modelClass;
});
