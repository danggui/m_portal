define(["View",getViewTemplatePath("MyhighChartsD5"),"UIScroll"],function(a,b,c){return _.inherit(a,{onCreate:function(){this.valueslist=[{name:"工资",data:[1056346.78,1056346.78,1000046.78,1000046.78,1056346.78,1056346.78,1456399.78,1456399.78,1456399.78,1456399.78,1456399.78,1956399.78]},{name:"奖金",data:[526830.58,526830.58,406830.58,406830.58,526830.58,526830.58,826899.58,826899.58,826899.58,826899.58,826899.58,1026830.58]},{name:"社保福利",data:[17123,17123,17123,17123,17123,17123,29123,29123,29123,29123,29123,29123]}],this.$el.html(b)},initialize:function($super,a,b){$super(a,b)},events:{},onPreShow:function(){this.turning()},onShow:function(){var a=this;this.chart=new Highcharts.Chart({chart:{animation:!0,renderTo:"scroller5",type:"column",marginRight:5,marginBottom:40},title:{text:"月度人事费用统计图",style:{"font-weight":"bold"},x:-20},xAxis:{categories:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},yAxis:{title:{text:null},plotLines:[{value:0,width:1,color:"#808080"}]},plotOptions:{column:{stacking:"normal"}},legend:{layout:"vertical",align:"center",verticalAlign:"top",borderWidth:0,y:16},series:a.valueslist,credits:{enabled:!1}}),this.scroll=new c({wrapper:this.$("#wrapper5"),scroller:this.$("#scroller5"),zoom:!0,onZoomEnd:function(){}})},onHide:function(){}})});