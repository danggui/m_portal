define(['AbstractModel'],function(AbstractModel){
    var Model= _.inherit(AbstractModel,{

        propertys: function ($super) {
            $super();
            this.url = "micro/tm/getLeaveList";
            this.param = {};
            this.dataformat = null;
            this.validates = [];
            this.protocol = 'http';
            this.contentType = 'jsonp';
            this.method = 'GET';

        },
        buildurl: function ($super) {
            $super();
            //alert(window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/')));
            if(this.baseurl.domain=='')
                this.baseurl.domain = window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/'));
            if(window.location.host!=undefined&&window.location.host!='')
                return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
            else
                return this.protocol + '://' + this.baseurl.domain + '/' + this.baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);
        }
    });

    var modelClass = {};

    modelClass.viewModel = function(apply_id,vct_type,s_date,e_date,vct_days,ee_id,vct_status,a_date,vct_status_type,vct_type_val){
        return {
            id: apply_id,
            type:vct_type,
            start:s_date,
            end: e_date,
            days:vct_days,
            applicant: ee_id,
            status:vct_status,
            dateApplicant:a_date,
            statusType:vct_status_type,
            typeVal:vct_type_val
        }
    };

    return modelClass.getInstance = function(){
        return this.instance instanceof Model ? this.instance: this.instance = new Model()
    },modelClass.createInstance = function(){
        return new Model();
    },modelClass;
});
