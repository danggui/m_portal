
define(['UIToast','MyProfileStore'], function (UIToast,MyProfileStore) {

    var contentTypeMap = {
        'json': 'application/json; charset=utf-8',
        'jsonp': 'application/json',
        'multipart_jsonp': 'multipart/form-data'
    };

    var _getContentType = function (contentType) {
        if (contentType) contentType = contentTypeMap[contentType] ? contentTypeMap[contentType] : contentType;
        return contentType;
    };

    /**
     * AJAX GET方式访问接口
     */
    function get(url, data, callback, error) {
        var opt = _getCommonOpt(url, data, callback, error);
        opt.type = 'GET';
        return _sendReq(opt);
    };

    /**
     * AJAX POST方式访问接口
     */
    function post(url, data, callback, error) {
        var contentType = data.contentType;
        // data = JSON.stringify(data);
//    data = JSON.stringify(data);
        var opt = _getCommonOpt(url, data, callback, error);
        opt.type = 'POST';
        opt.dataType = 'json';
        opt.timeout = 30000;
        opt.contentType = _getContentType(contentType) || 'application/json';
        return _sendReq(opt);
    };

    /**
     * 以GET方式跨域访问外部接口
     */
    function jsonp(url, data, callback, error) {
        var contentType = data.contentType;
        var opt = _getCommonOpt(url, data, callback, error);
        opt.type = 'GET';
        opt.dataType = 'jsonp';
        opt.crossDomain = true;
        opt.contentType = _getContentType(contentType) || 'application/json';
        return _sendReq(opt);
    };

    /**
     * 以POST方法跨域访问外部接口
     */
    function cros(url, type, data, callback, error) {
        var contentType = data.contentType;

        if (type.toLowerCase() !== 'get')
        // data = JSON.stringify(data);
            data = JSON.stringify(data);
        var opt = _getCommonOpt(url, data, callback, error);
        opt.type = type;
        opt.dataType = 'json';
        opt.crossDomain = true;
        opt.data = data;
        opt.contentType = _getContentType(contentType) || 'application/json';

        return _sendReq(opt);
    };

    /**
     * AJAX 提交表单,不能跨域
     * param {url} url
     * param {Object} form 可以是dom对象，dom id 或者jquery 对象
     * param {function} callback
     * param {function} error 可选
     */
    function form(url, form, callback, error) {
        var jdom = null, data = '';
        if (typeof form == 'string') {
            jdom = $('#' + form);
        } else {
            jdom = $(form);
        }
        if (jdom && jdom.length > 0) {
            data = jdom.serialize();
        }
        var opt = _getCommonOpt(url, data, callback, error);
        return _sendReq(opt);
    };

    function _sendReq(opt) {
        var sTime = new Date().getTime();
        var myProfileStore = MyProfileStore.getInstance();
        var sid = myProfileStore.getAttr('sessionid');
        var obj = {
            url: opt.url+";jsessionid="+sid+"?platform=3",
            type: opt.type,
            dataType: opt.dataType,
            data: opt.data,
            contentType: opt.contentType,
            timeout: opt.timeout || 50000,
//      headers:{
//        "P3P" : 'CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"'
//      },
            success: function (res,textStatus,resObj) {
//        alert(JSON.stringify(res));
                if(res.status!=undefined && res.status == "-1"){

                    if (!this.toast1) {
                        this.toast1 = new UIToast({
                            datamodel: {
                                content: 'content'
                            },
                            TIMERRES :  true
                        });
                    }
                    if (navigator.userAgent.indexOf("Safari") > -1) {
                        if(!(document.cookie || navigator.cookieEnabled))
                        {
                            this.toast1.showToast("请开启全部允许Cookie功能！",function(){window.location.href = '#index'.replace(/^#+/, '#');window.location.reload();});
                        }
                    }
                    this.toast1.showToast(JSON.parse(localStorage.LanguageStore).value.language.sessionToast,function(){window.location.href = '#index'.replace(/^#+/, '#');window.location.reload();});
                }else{
                    opt.callback(res,textStatus,resObj);
                }
            },
            error: function (err, textStatus, errorThrown) {
//        alert(textStatus);
                opt.error && opt.error(err);
            }
        };
        if(!window.is_hybrid) {
            //是否是跨域则加上这条
            if (opt.url.indexOf(window.location.host) === -1) obj.crossDomain = !!opt.crossDomain;
        }else{
            obj.type = 'GET';
        }
        return $.ajax(obj);
    };

    function _getCommonOpt(url, data, callback, error) {
        return {
            url: url,
            data: data,
            callback: callback,
            error: error
        };
    };

    return {
        get: get,
        post: post,
        jsonp: jsonp,
        cros: cros,
        form: form
    };

});
