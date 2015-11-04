/**
 * Created by Lance.Z on 2015/04/3.
 */
define(["store"],function(store){
    var languageStore = _.inherit(store,{
        propertys: function($super){
            $super();
            this.key = "LanguageStore";
            this.lifeTime = "1D";
        },

        initialize: function($super, e) {
            $super(e)
        }
    });
    //单例模式
    var StoreClass = {};

    return StoreClass.getInstance = function(){
        return this.instance instanceof languageStore ? this.instance: this.instance = new languageStore()
    },StoreClass.createInstance = function(){
        return new languageStore();
    },StoreClass;
})
