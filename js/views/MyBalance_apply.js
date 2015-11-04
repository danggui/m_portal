/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyBalance_apply'),'MyBalanceApplyModel','UIRadioList','UIGroupSelect'],function(View,viewhtml,MyBalanceApplyModel,UIRadioList,UIGroupSelect){
  var myBalanceApplyModel = MyBalanceApplyModel.getInstance();
  return _.inherit(View,{
    onCreate: function () {
//      var scope = this;
      this.$el.html(viewhtml);
    },

    events: {
      "focus input,textarea": "headerFocus",
      "blur input,textarea": "headerBlur",
      "click #selectLeaveType": "selectLeaveType",
      "click #selectStartDate": "selectMonth_Time",
      "click #selectEndDate": "selectMonth_Time"
    },

    headerFocus: function () {
      $("header").css("position", "static")
    },

    headerBlur: function () {
      $("header").css("position", "fixed")
    },

    selectMonth_Time: function(e){
      var data1 = [],i1, data2 = [],i2, data3 = [],i3, data4 = [],i4, data5 = [],i5,scope = this;
      this.targetinput = $(e.currentTarget).find('input[type="text"]');
      if (!this.groupSelectS) {
        var date_now = new Date();
        i1 = 14,i2 = date_now.getMonth(),i3 = date_now.getDate()-1,i4=date_now.getHours()-1,i5 = date_now.getMinutes()-1;
        for (var i = date_now.getFullYear()-14; i <= date_now.getFullYear(); i++) {
          var obj = { id: i, name:  i + '年' };
          data1.push(obj);
        }

        for (var i = 1; i <= 12; i++) {
          var obj = { id: (i<10?'0':'')+i, name: i + '月' };
          data2.push(obj);
        }

        for (var i = 1; i <= 31; i++) {
          var obj = { id: (i<10?'0':'')+i, name: i + '日'};
          data3.push(obj);
        }

        for (var i = 1; i <= 24; i++) {
          var obj = { id: (i<10?'0':'')+i, name: i + '时'};
          data4.push(obj);
        }

        for (var i = 1; i <= 60; i++) {
          var obj = { id: (i<10?'0':'')+i, name: i + '分'};
          data5.push(obj);
        }

        this.groupSelectS = new UIGroupSelect({
          datamodel: {
            title: '时间选择',
            btns: [
              { name: '取消', className: 'pop-box-btns-cancel' },
              { name: '确定', className: 'pop-box-btns-ok' }
            ]
          },
          data: [data1, data2, data3, data4, data5],
          indexArr:[i1,i2,i3,i4,i5],
          changedArr: [
            function(item) {
              var  d = this.scrollArr[2];
              var item_y = parseInt(item.name);
              var item_m = parseInt(this.scrollArr[1].getSelected().name);
              var tmp = _.dateUtil.getDaysOfMonth(item_y,item_m);
              for(var i=31;i>28;i--) {
                //重置可选
                d.datamodel.data[i-1].disabled = false;
                //如果当月最大日数小于i，则为不可选
                if(i > tmp)  d.datamodel.data[i-1].disabled = true;
              }
              this.scrollArr[2].reload();
              this.scrollArr[3].reload();
              this.scrollArr[4].reload();
              this.indexArr[0] = parseInt(item.name)- parseInt(this.scrollArr[0].datamodel.data[0].name);
              console.log('my year:', item);
            },
            function(item) {
              var  d = this.scrollArr[2],           //获取日select组件
                   item_m = parseInt(item.name);     //获取当前选中的月

              var item_y = parseInt(this.scrollArr[0].getSelected().name);
              var tmp = _.dateUtil.getDaysOfMonth(item_y,item_m);
              for(var i=31;i>28;i--) {
                //重置可选
                d.datamodel.data[i-1].disabled = false;
                //如果当月最大日数小于i，则为不可选
                if(i > tmp)  d.datamodel.data[i-1].disabled = true;
              }
              //重绘数据模型
//              data3 = [];
//              for (var i = 1; i <= dayFlag; i++) {
//                var obj = { id: 'd_' + i, name: i + '日'};
//                data3.push(obj);
//              }
//
//              this.scrollArr[2].datamodel.data = data3;

              this.scrollArr[2].reload();
              this.scrollArr[3].reload();
              this.scrollArr[4].reload();
              this.indexArr[1] = parseInt(item.name)-1;
              console.log('my month:', item);
            },
            function(item) {
              this.indexArr[2] =  parseInt(item.name)-1;
              console.log('my day:', item);
            },
            function(item){
              this.indexArr[3] =  parseInt(item.name)-1;
            },
            function(item){
              this.indexArr[4] =  parseInt(item.name)-1;
            }
          ],
          //
          onOkAction: function(items) {
            scope.targetinput.val(items[0].id+'-'+items[1].id+'-'+items[2].id+' '+items[3].id+':'+items[4].id);
            this.hide();
          },
          onCancelAction: function(item) {
            console.log('my cancelAction', item);
            this.hide();
          }
        });
      }
      this.groupSelectS.show();
    },

    selectLeaveType: function(){
      myBalanceApplyModel.execute(function(data){
        if (!this.selectType_radio) {
          var demodata1 =  [],
              scope = this;
          _.each(data.data,function(value, key, list){
            demodata1.push({'id':value.leave_type,'name':value.leave_name})
          });
          this.selectType_radio = new UIRadioList({
            //数据模型
            datamodel: {
              title: '选择假期类型',
              data: demodata1
            },
            displayNum: 5,
            selectId: 4,
            index: 4,
            onClick: function(e, data) {
              scope.$('#leave_type').text(data.name);
              this.hide();
            }
          });
        }
        this.selectType_radio.show();
      },function(e){

      },this)
    },

    onPreShow: function (){
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
      this.headerBlur();
      if(this.selectType_radio)
        this.selectType_radio.hide();
    }
  });
});
