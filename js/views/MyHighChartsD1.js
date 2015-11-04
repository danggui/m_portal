/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('MyhighChartsD1'),'UIScroll'], function (View, viewhtml,UIScroll) {
  return _.inherit(View,{
    onCreate: function () {
      this.valueslist = [{
        name: '中寰国际控股集团公司',
        data: [79,77,78,78,79,82,80,80,80,83,82,81]
      }, {
        name: '中寰车辆发展有限公司',
        data: [20,22,27,24,21,24,22,19,24,28,22,18]
      }, {
        name: '中寰新能源有限公司',
        data: [30,30,30,30,32,35,50,50,50,50,50,49]
      }, {
        name: '中寰车配件有限公司',
        data: [10,11,11,13,10,10,11,10,10,10,10,10]
      }];
      this.$el.html(viewhtml);
    },

    initialize: function ($super, app, id) {
      $super(app, id);

      this.$('header').append($('<i class="icon_menu i_bef i_right"></i>'));
    },

    events: {
      'click .icon_menu': function () {
        this.forward('MyHighChartsD2');
      }
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      var scope = this;
      this.chart = new Highcharts.Chart({
        chart: {
          animation: true,
          renderTo: 'scroller',
          defaultSeriesType: 'line',
          marginRight: 5,
          marginBottom: 40
        },
        title: {
          text: '月度人数统计图',
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
          line: {
            dataLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold'
              },
              formatter: function() {
                return this.y;
              }
            }
          }
        },
//        tooltip: {
//          valueSuffix: '°C'
//        },
        legend: {
          layout: 'vertical',
          align: 'center',
          verticalAlign: 'top',
          borderWidth: 0,
          y:16
        },
        series: this.valueslist,
        credits: {
          enabled: false
        }
      });

      this.scroll = new UIScroll({
        wrapper: this.$("#wrapper"),
        scroller: this.$("#scroller"),
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
