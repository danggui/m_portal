/**
 * Created by Patrick.Fang on 2014/11/3.
 */
define(['storage'],function(storage){
  return _.inherit(storage,{


    propertys: function(){
      this.NULL = {},
      this.key = this.NULL,
      this.lifeTime = "30M",
      this.defaultData = null,
      this.rollbackEnabled = 1,
      this.sProxy = this.NULL
    },

    initialize: function(params) {
      this.propertys();
      for (var key in params) this[key] = params[key];
      this.assert();
    },

    assert: function() {
      if (this.key === this.NULL) throw "not override key property"
    },

    set: function(value, tag, oldvalue) {
      var r = this._getNowTime();
      r= _.dateUtil.addSeconds(r,this._getLifeTime()),
        this.rollbackEnabled && !oldvalue && (oldvalue = value),
        this.sProxy.set(this.key, value, r, tag, null, oldvalue)
    },

    setLifeTime: function(e, t) {
      this.lifeTime = e;
      var n = this.getTag(),
          r = this.get(),
          i;
      t ? i = this._getNowTime() : i = this.sProxy.getSaveDate(this.key, !0) || this._getNowTime();
      var s = _.dateUtil.format(i,"Y/m/d H:i:s");
      i = _.dateUtil.addSeconds(i,this._getLifeTime()),
        this.sProxy.set(this.key, r, i, n, s)
    },

    setAttr: function(el, value, tag) {
      if (_.isObject(el)) {
        for (var r in el) el.hasOwnProperty(r) && this.setAttr(r, el[r], value);
        return
      }
      tag = tag || this.getTag();
      var valueObj = this.get(tag) || {},
          OldvalueObj = {};
      if (valueObj) {
        if (this.rollbackEnabled) {
          OldvalueObj = this.get(tag, !0);
          var o = HObject.get(valueObj, el);
          HObject.set(OldvalueObj, el, o)
        }
        HObject.set(valueObj, el, value);
        return  this.set(valueObj, tag, OldvalueObj)
      }
      return !1
    },

    get: function(tag, n) {
      var r = null,
          i = !0;
      Object.prototype.toString.call(this.defaultData) === "[object Array]" ? r = this.defaultData.slice(0) : this.defaultData && (r = _.clone(this.defaultData));
      var s = this.sProxy.get(this.key, tag, n),
          o = typeof s;
      if ({
        string: !0,
        number: !0,
        "boolean": !0
      } [o]) return s;
      if (s) if (Object.prototype.toString.call(s) == "[object Array]") {
        r = [];
        for (var u = 0,a = s.length; u < a; u++)
          r[u] = s[u]
      } else s && !r && (r = {});
      $.extend(true,r, s);
      for (var f in r) {
        i = !1;
        break
      }
      return i ? null: r
    },

    getAttr: function(el, tag) {
      var valueobj = this.get(tag),
          result = null;
      return valueobj && (result = HObject.get(valueobj, el)),
        result
    },

    getTag: function() {
      return this.sProxy.getTag(this.key)
    },

    remove: function() {
      this.sProxy.remove(this.key)
    },

    removeAttr: function(el) {
      var valueobj = this.get() || {};
      valueobj[el] && delete valueobj[el],
        this.set(valueobj)
    },

    getExpireTime: function() {
      var e = null;
      try {
        e = this.sProxy.getExpireTime(this.key)
      } catch(t) {
        console && 0
      }
      return e
    },

    setExpireTime: function(e) {
      var t = this.get(),
          n = Date.parse(e);
      this.sProxy.set(this.key, t, n)
    },

    _getNowTime: function() {
      return new Date
    },

    _getLifeTime: function() {
      var e = 0,
          t = this.lifeTime + "",
          n = t.charAt(t.length - 1),
          r = +t.substring(0, t.length - 1);
      return typeof n == "number" ? n = "M": n = n.toUpperCase(),
          n == "D" ? e = r * 24 * 60 * 60 : n == "H" ? e = r * 60 * 60 : n == "M" ? e = r * 60 : n == "S" ? e = r: e = r * 60,
        e
    },

    rollback: function(e) {
      if (this.rollbackEnabled) {
        var t = this.getTag(),
            n = this.sProxy.get(this.key, t),
            r = this.sProxy.get(this.key, t, !0);
        if (e && e instanceof Array) for (var i in e) {
          var s = e[i],
              o = r[s];
          typeof o != "undefined" && (n[s] = o)
        } else n = r,
          r = {};
        this.set(n, t, r)
      }
    }
  })
});
