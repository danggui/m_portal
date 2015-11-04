define(["store"],function(store){
  var myProfilestore = _.inherit(store,{
    propertys: function($super){
      $super();
      this.key = "EnvStore";
      this.lifeTime = "1D";
    },

    initialize: function($super, e) {
      $super(e)
    }
  });
  //单例模式
  var StoreClass = {};

  return StoreClass.getInstance = function(){
    return this.instance instanceof myProfilestore ? this.instance: this.instance = new myProfilestore()
  },StoreClass.createInstance = function(){
    return new myProfilestore();
  },StoreClass;
})
