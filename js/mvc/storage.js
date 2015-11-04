define(["abstractStorage"],function(abst){
  var storage = _.inherit(abst,{
    propertys: function($super){
      $super();
    },

    initialize: function($super){
      $super();
      this.proxy = window.localStorage;
    },

    oldGet: function(key) {
      var stoObj = localStorage.getItem(key);
      stoObj = stoObj ? JSON.parse(stoObj) : null;
      if (stoObj && stoObj.timeout) {
        var i = new Date,
            s = Date.parse(stoObj.timeout).valueOf();
        if (stoObj.timeby) {
          if (s - i >= 0) return stoObj
        } else if (s - i.valueOf() >= 0) return stoObj;
        return localStorage.removeItem(key),
          null
      }
      return stoObj
    },

    oldSet: function(key, value) {
      localStorage.setItem(key, value)
    },

    getExpireTime: function(key) {
      var stoObj = localStorage.getItem(key),
          result = stoObj ? JSON.parse(stoObj) : null;
      return result && result.timeout ? result.timeout: _.dateUtil.format(_.dateUtil.addDay(new Date(),2),"Y-m-d")
    },

    oldRemove: function(key) {
      localStorage.removeItem(key)
    }
  });

  //单例模式
  return storage.getInstance = function(){
    return this.instance instanceof storage ? this.instance: this.instance = new storage()
  },storage.createInstance = function(){
    return new storage();
  },storage;
})
