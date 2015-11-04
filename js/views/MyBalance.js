/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('MyBalance'),'MyBalanceModel','UIGroupList','UIRadioList','UIGroupSelect'],function(View,viewhtml,MyBalanceModel,UIGroupList,UIRadioList,UIGroupSelect){
  return _.inherit(View,{
    onCreate: function () {
      var scope = this;
      this.$el.html(viewhtml);

      this.els = {
        remain_leaves_tpl: this.$el.find("#remain_leaves_tpl")
      };

      var myBalanceModel = MyBalanceModel.getInstance();
      myBalanceModel.execute(function(data){
        var demodata_unclose = [];
        _.each(data.data.unclose_leaves,function(value, key, list){
          demodata_unclose.push(MyBalanceModel.viewMenuInfoModel('MyBalance_detail',value.name,value.apply_time+"&nbsp;"+value.state_name,[],'','',true));
        });

        var demodata_finish = [];
        _.each(data.data.finish_leaves,function(value, key, list){
          demodata_finish.push(MyBalanceModel.viewMenuInfoModel('MyBalance_detail',value.name,value.span,[],'','',true));
        });

        this.$("#remain_leaves_wrap").html(_.template(this.els.remain_leaves_tpl.html())({'remain_leaves_data':data.data.remain_leaves}));

        this.grouplist1 = new UIGroupList({
          datamodel: {
            data: demodata_unclose
          },
          onGroupClick: function (index, items, e) {
            scope.forward(this.datamodel.data[index].gname);
          },
          wrapper: this.$('.wrapper_unclose_leaves')
        });
        this.grouplist1.show();

        this.grouplist2 = new UIGroupList({
          datamodel: {
            data: demodata_finish
          },
          onGroupClick: function (index, items, e) {
            scope.forward(this.datamodel.data[index].gname);
          },
          wrapper: this.$('.wrapper_finish_leaves')
        });
        this.grouplist2.show();
      },function(e){

      },this);
    },

    events: {
      'click #selectMonth':'selectMonth_fun',
      'click #apply_leave': function(){
        this.forward('MyBalance_apply');
      }
    },

    selectMonth_fun: function(){
      var data1 = [], data2 = [], data3 = [];

      for (var i = 2000; i <= 2014; i++) {
        var obj = { id: 'y_' + i, name:  i + '年' };
        data1.push(obj);
      }

      for (var i = 1; i <= 12; i++) {
        var obj = { id: 'm_' + i, name: i + '月' };
        data2.push(obj);
      }

      for (var i = 1; i <= 31; i++) {
        var obj = { id: 'd_' + i, name: i + '日'};
        data3.push(obj);
      }

      if (!this.groupSelect2) {
        this.groupSelect2 = new UIGroupSelect({
          datamodel: {
            title: '日期选择',
            btns: [
              { name: '取消', className: 'pop-box-btns-cancel' },
              { name: '确定', className: 'pop-box-btns-ok' }
            ]
          },
          data: [data1, data2, data3],
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
              console.log('my month:', item);
            },
            function(item) {
              console.log('my day:', item);
            }],
          //
          onOkAction: function(item) {
            console.log('my okAction', item);
            this.hide();
          },
          onCancelAction: function(item) {
            console.log('my cancelAction', item);
            this.hide();
          }
        });
      }

      if (!this.selectMonth_radio) {
        var demodata1 =  [{ id:'上月'},{ id:'本月'}, {id:'今年' }, {id:'其他' }],
            scope = this;
        this.selectMonth_radio = new UIRadioList({
          //数据模型
          datamodel: {
            title: '请选择时间',
            data: demodata1
          },
          displayNum: 4,
          selectId: '本月',
          index: 4,
          onClick: function(e, data) {
            scope.$('#title_month').text(data.id);
            if(data.id == '其他')
              scope.groupSelect2.show();
            else
              scope.groupSelect2.hide();
            //scope.$('#input_month').val(data.id);
            this.hide();
          }
        });
      }
      this.selectMonth_radio.show();
    },

    onPreShow: function (){
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
    }
  });
});
