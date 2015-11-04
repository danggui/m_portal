/**
 * Created by Patrick.Fang on 2014/9/18.
 */
define([],function(){
  //单例模式
  var modelClass = {};

  modelClass.viewMenuInfoModel = function(id,name,content,data,directUrl){
//    { gname:'ViewSalary-detail',name: '基本工资',content:'7800.00CNY', data: [],directUrl:true },
    var mapMenu = [{'id':'0000','gname':'MyInfo-detail-position'},{'id':'0005','gname':'MyInfo-detail-info'}
      ,{'id':'0010','gname':'MyInfo-detail-contract'},{'id':'0030','gname':'MyInfo-detail-family'},{'id':'0025','gname':'MyInfo-detail-contact'}],gname='';
    _.each(mapMenu,function(value){
      if(value.id == id)
        gname = value.gname;
    });
    return {
      gname: gname,
      name: name,
      content:content,
      data:data,
      directUrl:directUrl
    }
  };
  return modelClass;
});
