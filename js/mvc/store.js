define(["AbstractStore", "storage"],
  function(AbstractStore,storage) {
    var r = _.inherit(AbstractStore, {
      propertys: function($super) {
        $super();
        this.sProxy = storage.getInstance();
      },
      initialize: function($super, e) {
        $super(e)
      }
    });
    return r
  })
