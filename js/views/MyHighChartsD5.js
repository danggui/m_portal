/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('MyhighChartsD5'),'UIScroll'], function (View, viewhtml,UIScroll) {
  return _.inherit(View,{
    onCreate: function () {
      this.valueslist = [{
        name: '工资',
        data: [1056346.78,1056346.78,1000046.78,1000046.78,1056346.78,1056346.78,1456399.78,1456399.78,1456399.78,1456399.78,1456399.78,1956399.78]
      }, {
        name: '奖金',
        data: [526830.58,526830.58,406830.58,406830.58,526830.58,526830.58,826899.58,826899.58,826899.58,826899.58,826899.58,1026830.58]
      }, {
        name: '社保福利',
        data: [17123.00,17123.00,17123.00,17123.00,17123.00,17123.00,29123.00,29123.00,29123.00,29123.00,29123.00,29123.00]
      }];
      this.$el.html(viewhtml);
    },

    initialize: function ($super, app, id) {
      $super(app, id);
    },

    events: {
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      var scope = this;
      this.chart = new Highcharts.Chart({
        chart: {
          animation: true,
          renderTo: 'scroller5',
          type: 'column',
          marginRight: 5,
          marginBottom: 40
        },
        title: {
          text: '月度人事费用统计图',
          style: {"font-weight":"bold"},
          x: -20 //center
        },
        xAxis: {
          categories: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          title: {
            text: null
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
//        tooltip: {
//          valueSuffix: '%'
//        },
        legend: {
          layout: 'vertical',
          align: 'center',
          verticalAlign: 'top',
          borderWidth: 0,
          y:16
        },
        series: scope.valueslist,
        credits: {
          enabled: false
        }
      });

      this.scroll = new UIScroll({
        wrapper: this.$("#wrapper5"),
        scroller: this.$("#scroller5"),
        zoom:true,
        onZoomEnd:function(){
//          scope.$("#container").width(this.scrollerW/2).height(this.scrollerH/2);
//          alert(this.scrollerH+'_'+this.scrollerW);
//          scope.chart.reflow();
        }
      })
    },

    onHide: function () {

    }
  });
});
