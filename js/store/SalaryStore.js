define(["store"],function(store){
  var baseSalaryStore = _.inherit(store,{
    propertys: function($super){
      $super();
      this.key = "BaseSalary_List";
      this.lifeTime = "1D";
    },

    initialize: function($super, e) {
      $super(e)
    }
  });
  //单例模式
  var StoreClass = {};

  return StoreClass.getInstance = function(){
    return this.instance instanceof baseSalaryStore ? this.instance: this.instance = new baseSalaryStore()
  },StoreClass.createInstance = function(){
    return new baseSalaryStore();
  },StoreClass;
})
