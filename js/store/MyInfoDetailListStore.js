/**
 * Created by Patrick.Fang on 2014/11/3.
 */
define(["store"],function(store){
  var myInfoDLstore = _.inherit(store,{
    propertys: function($super){
      $super();
      this.key = "myInfoDetail_List";
      this.lifeTime = "1D";
    },

    initialize: function($super, e) {
      $super(e)
    }
  });
  //单例模式
  var StoreClass = {};

  return StoreClass.getInstance = function(){
    return this.instance instanceof myInfoDLstore ? this.instance: this.instance = new myInfoDLstore()
  },StoreClass.createInstance = function(){
    return new myInfoDLstore();
  },StoreClass;
})
