/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('MyhighChartsD2'),'UIScroll','UIRadioList'], function (View, viewhtml,UIScroll,UIRadioList) {
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
//      Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
//        return {
//          radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
//          stops: [
//            [0, color],
//            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
//          ]
//        };
//      });
      this.$el.html(viewhtml);
    },

    events: {
      'click #selectDate':'selectMonth'
    },

    selectMonth: function(){
      if (!this.selectMonth_radio) {
        var demodata1 =  [],
            scope = this;
        for(var i = 1;i<=12;i++){
          demodata1.push({'id':i,'name':i+'月'});
        }
        this.selectMonth_radio = new UIRadioList({
          //数据模型
          datamodel: {
            title: '选择日期',
            data: demodata1,
            selectId: 1
          },
          displayNum: 5,
          index: 0,
          onClick: function(e, data) {
            var total = 0,datar = [];
            for(var i = 0;i <scope.valueslist.length;i++)
              total += scope.valueslist[i].data[data.id-1];
            for(i = 0;i <scope.valueslist.length;i++)
              datar.push([scope.valueslist[i].name,parseFloat(scope.valueslist[i].data[data.id-1]/total)]);
            if(scope.chart){
              scope.chart.setTitle({text:data.name});
              scope.chart.series[0].name = data.name;
              scope.chart.series[0].setData(datar);
            }
            this.hide();
          }
        });
      }
      this.selectMonth_radio.show();
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      var scope = this;
      var total = 0,data = [];
      for(var i = 0;i <this.valueslist.length;i++)
        total += this.valueslist[i].data[0];
      for(var i = 0;i <scope.valueslist.length;i++)
        data.push([scope.valueslist[i].name,parseFloat(scope.valueslist[i].data[0]/total)]);
      this.chart = new Highcharts.Chart({
        chart: {
          renderTo: 'scroller2',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          marginRight: 5,
          marginBottom: 40
        },
        title: {
          text: '1月'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
//              color: '#000000',
//              connectorColor: '#000000',
//              formatter: function() {
//                return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
//              }
            }
          }
        },
        series: [{
          type: 'pie',
          name: '1月',
          data: data
        }],
        credits: {
          enabled: false
        }
      });

      this.scroll = new UIScroll({
        wrapper: this.$("#wrapper2"),
        scroller: this.$("#scroller2"),
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
