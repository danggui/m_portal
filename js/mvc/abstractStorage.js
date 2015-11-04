define([],function(){
  return _.inherit({
    propertys: function(){
      this.proxy = null;
      this.overdueClearKey = "ClEAR_OVERDUE_CATCH"
    },

    initialize: function(){
      this.propertys();
    },

    removeOverdueCathch: function() {
      var e = new Date(),
          t = this.proxy.getItem(this.overdueClearKey),
          valueObj = [],
          i = [];
      if (!t) return;
      valueObj = JSON.parse(t);
      for (var s = 0,o; s < valueObj.length; s++)
        o = valueObj[s],_.dateUtil.parse(o.timeout) <= e ? this.proxy.removeItem(o.key) : i.push(o);
      this.proxy.setItem(this.overdueClearKey, JSON.stringify(i))
    },

    _removeOdCLately: function(num) {
      num = num || 5;
      var t = this.proxy.getItem(this.overdueClearKey),
          valueObj = [];
      if (t) {
        valueObj = JSON.parse(t);
        valueObj.sort(function(e, t) {
          var n = _.dateUtil.parse(e.timeout),
              r = _.dateUtil.parse(t.timeout);
          return n - r
        });
        var resultobj = valueObj.splice(0, num) || [];
        for (var i = 0; i < resultobj.length; i++) this.proxy.removeItem(resultobj[i].key);
        this.proxy.removeItem(this.overdueClearKey);
        valueObj.length > 0 && this.proxy.setItem(this.overdueClearKey, JSON.stringify(valueObj))
      }
    },

    _setOverdueCathch: function(key, timeout) {
      if (!key || !timeout || _.dateUtil.parse(timeout, !0) < new Date()) return;
      var r = {},
          valueobj = [],
          s = this.proxy.getItem(this.overdueClearKey);
      r.key = key,
        r.timeout = timeout,
        s && (valueobj = JSON.parse(s));
      var o = !1;
      for (var index = 0,item; index < valueobj.length; index++)
        item = valueobj[index],item.key == key && (valueobj[index] = r, o = !0);
      o || valueobj.push(r),this.proxy.setItem(this.overdueClearKey, JSON.stringify(valueobj))
    },

    _buildStorageObj: function(value, timeout, tag, savedate, oldvalue) {
      return {
        value: value,
        oldvalue: oldvalue || null,
        timeout: timeout,
        tag: tag,
        savedate: savedate
      }
    },

    set: function(key, value, timeout, tag, savedate, oldvalue) {
      savedate = savedate || _.dateUtil.format(new Date(),"Y/M/D H:F:S");
      timeout = timeout ? new Date(timeout) : _.dateUtil.addDay(new Date(),30);
      this._setOverdueCathch(key, _.dateUtil.format(timeout,"Y/M/D H:F:S"));
      var stoObj = this._buildStorageObj(value, _.dateUtil.format(timeout,"Y/M/D H:F:S"), tag, savedate, oldvalue);
      try {
        return this.proxy.setItem(key, window.JSON.stringify(stoObj)),!0
      } catch(f) {
        f.name == "QuotaExceededError" && (this._removeOdCLately(5), this.set(e, r, i, s, o, u)),
          console && 0
      }
      return !1
    },

    get: function(key, tag, i) {
      var stoObj, o = null;
      try {
        stoObj = this.proxy.getItem(key);
        stoObj && (stoObj = window.JSON.parse(stoObj),
          Date.parse(stoObj.timeout) >= new Date && (tag ? tag === stoObj.tag && (o = i ? stoObj.oldvalue: stoObj.value) : o = i ? stoObj.oldvalue: stoObj.value))
      } catch(u) {
        console && 0
      }
      return o
    },

    getTag: function(key) {
      var stoObj, r = null,
          result = null;
      try {
        stoObj = this.proxy.getItem(key),
          stoObj && (stoObj = window.JSON.parse(stoObj), result = stoObj && stoObj.tag)
      } catch(s) {
        console && 0
      }
      return result
    },

    getSaveDate: function(key, r) {
      var stoObj, SaveDate = null;
      try {
        stoObj = this.proxy.getItem(key),
          stoObj && (stoObj = window.JSON.parse(stoObj), stoObj.savedate && (SaveDate = Date.parse(stoObj.savedate), r || (SaveDate = SaveDate.valueOf())))
      } catch(o) {
        console && 0
      }
      return SaveDate
    },

    getExpireTime: function(key) {
      var stoObj = null,
          r = null;
      try {
        stoObj = this.proxy.getItem(key),
          stoObj && (stoObj = window.JSON.parse(n), r = Date.parse(stoObj.timeout))
      } catch(i) {
        console && 0
      }
      return r
    },

    remove: function(key) {
      return this.proxy.removeItem(key)
    },

    getAll: function() {
      var length = this.proxy.length,
          t = [];
      for (var n = 0; n < length; n++) {
        var r = this.proxy.key(n),
            i = {
              key: r,
              value: this.get(r)
            };
        t.push(i)
      }
      return t
    },

    clear: function() {
      this.proxy.clear()
    },

    gc: function() {
      var e = this.proxy,
          length = this.proxy.length;
      for (var n = 0; n < length; n++) {
        var r = e.key(n);
        if (r == "GUID") break;
        try {
          this.get(r) || this.remove(r)
        } catch(i) {}
      }
    }
  });
})
