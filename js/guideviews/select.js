define(['View', getGuideViewTemplatePath('select'), 'UISelect','UIScrollX', 'UIRadioList','UIGroupSelect'], function (View, viewhtml, UISelect,UIScrollX,UIRadioList,UIGroupSelect) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo2': 'Demo2',
      'click .demo3': 'Demo3',
      'click .demo4': 'Demo4'
    },

    _initDemo1: function () {

      if (this.demo1) return;
      //这里若是demo1有显示状态什么的需要注意资源释放
      var scope = this, curItem;
      var demo1Sec = scope.$('.demo1Sec');
      this.demo1 = new UISelect({
        datamodel: {
          data: [
            { id: 1, name: '中国' }, { id: 2, name: '美国' }, { id: 3, name: '英国' }
          ]
        },
        displayNum: 3,
        changed: function (item) {
          demo1Sec.html(item.id + ': ' + item.name);
        },
        wrapper: this.$('.demo1')
      });

      this.demo1.show();

      curItem = this.demo1.getSelected();
      demo1Sec.html(curItem.id + ': ' + curItem.name);

    },

    Demo2: function () {
      if (!this.radio1) {
        var demodata1 =  [{ id:'22'}, { id:'222'}, {id:'22222' }, {id:'2222222' },{id:'2222222' }, {id:'3333' }],
            scope = this;
        this.radio1 = new UIRadioList({
          //数据模型
          datamodel: {
            title: '2b2b',
            data: demodata1
          },
          displayNum: 5,
          selectId: 4,
          index: 4,
          onClick: function(e, data) {
            console.log(data.id);
            scope.$('.demo-input1').val(data.id);
            this.hide();
          }
        });
      }
      this.radio1.show();
    },

    Demo3: function(){
      var data1 = [];
      var data2 = [];

      for (var i = 0; i < 10; i++) {
        var obj = { id: 'q_' + i, name: '项目_' + i };
        if (i % 3 == 0) obj.disabled = true;
        data1.push(obj);
      }

      for (var i = 0; i < 10; i++) {
        var obj = { id: 'qqq_' + i, name: '项目_' + i };
        if (i % 4 == 0) obj.disabled = true;
        data2.push(obj);
      }

      if (!this.groupSelect) {
        this.groupSelect = new UIGroupSelect({
          data: [data1, data2],
          onOkAction: function(items) {
            console.log('ok', items);
            this.hide();
          },
          onCancelAction:function() {
            console.log('cancel');
            this.hide();
          }
        });
      }
      this.groupSelect.show();
    },

    Demo4: function(){
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
      this.groupSelect2.show();
    },

    initElement: function () {
      $(".wscroller").each(function(i,obj){
        new UIScrollX({
          swrapper:$(obj),
          scroller:$(obj).find(".sscroller")
        });
      });
    },

    onPreShow: function () {


      this.turning();
    },

    onShow: function () {
      this._initDemo1();
      this.initElement();
    },

    onHide: function () {
      if(this.radio1)
        this.radio1.hide();
    }

  });
});
