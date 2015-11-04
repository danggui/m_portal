define(["store"],function(store){
    var todoListstore = _.inherit(store,{
        propertys: function($super){
            $super();
            this.key = "todoListStore";
            this.lifeTime = "1D";
        },

        initialize: function($super, e) {
            $super(e)
        }
    });
    //µ¥ÀýÄ£Ê½
    var StoreClass = {};

    StoreClass.viewModel = function(id,type,adate,start,end,days,applicant,reason){
        return {
            id: id,
            type:type,
            adate:adate,
            start:start,
            end: end,
            days:days,
            applicant: applicant,
            reason:reason
        }
    };

    return StoreClass.getInstance = function(){
        return this.instance instanceof todoListstore ? this.instance: this.instance = new todoListstore()
    },StoreClass.createInstance = function(){
        return new todoListstore();
    },StoreClass;
})
