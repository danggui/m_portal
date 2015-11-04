/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('MyhighChartsD3'),'UIScroll'], function (View, viewhtml,UIScroll) {
  return _.inherit(View,{
    onCreate: function () {
      this.valueslist = [{
        name: '中寰国际控股集团公司',
        data: [3.00,3.00,6.00,7.00,8.50,6.00,8.83,9.76,10.69,11.62,12.55,13.48]
      }, {
        name: '中寰车辆发展有限公司',
        data: [2.50,2.00,2.00,1.67,1.80,1.47,1.30,1.13,0.95,0.78,0.61,0.43]
      }, {
        name: '中寰新能源有限公司',
        data: [4.00,5.00,7.00,7.00,5.60,7.28,7.80,8.32,8.84,9.36,9.88,10.40]
      }, {
        name: '中寰车配件有限公司',
        data: [1.00,1.00,2.00,4.00,4.50,5.40,6.30,7.20,8.10,9.00,9.90,10.80]
      }];
//      this.valueslist = [{
//        name: '中寰国际控股集团公司',
//        data: ['3.00,'3.00%','6.00%','7.00%','8.50%','6.00%','8.83%','9.76%','10.69%','11.62%','12.55%','13.48%']
//      }, {
//        name: '中寰车辆发展有限公司',
//        data: ['2.50%','2.00%','2.00%','1.67%','1.80%','1.47%','1.30%','1.13%','0.95%','0.78%','0.61%','0.43%']
//      }, {
//        name: '中寰新能源有限公司',
//        data: ['4.00%','5.00%','7.00%','7.00%','5.60%','7.28%','7.80%','8.32%','8.84%','9.36%','9.88%','10.40%']
//      }, {
//        name: '中寰车配件有限公司',
//        data: ['1.00%','1.00%','2.00%','4.00%','4.50%','5.40%','6.30%','7.20%','8.10%','9.00%','9.90%','10.80%']
//      }];
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
          renderTo: 'scroller3',
          defaultSeriesType: 'line',
          marginRight: 5,
          marginBottom: 40
        },
        title: {
          text: '年度主动离职率统计图',
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
//          line: {
//            dataLabels: {
//              enabled: true,
//              style: {
//                fontWeight: 'bold',
//                fontSize :'9px'
//              },
//              formatter: function() {
//                return this.y +'%';
//              }
//            }
//          }
        },
        tooltip: {
          valueSuffix: '%'
        },
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
        wrapper: this.$("#wrapper3"),
        scroller: this.$("#scroller3"),
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
