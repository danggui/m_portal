/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('ViewSalary'),'UIToast','UIGroupList','UIRadioList','SalaryStore','SalaryModel','SalaryCalendarModel','SalaryBasicInfoModel','LanguageStore','UILoading'],function(View,viewhtml,UIToast,UIGroupList,UIRadioList,SalaryStore,SalaryModel,SalaryCalendarModel,SalaryBasicInfoModel,LanguageStore,UILoading){
    var calendarData = calendarData ||[],
         lanStore = LanguageStore.getInstance(),
         CDPnotes = '',
        pieData = [];
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);

            $('#salary-title')[0].innerHTML = lanStore.getAttr('language').payslip;
            CDPnotes = lanStore.getAttr('language').aboutCDPInfo;

            this.els = {
                basic_salary_tpl: this.$el.find("#basic_salary_tpl")
            };

            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            if (!this.loading1) {
                this.loading1 = new UILoading({
                    maskToHide: true
                });
            }


            var calendarModel = SalaryCalendarModel.getInstance();

            calendarModel.execute(
                function(data) {
                    if(data.status == "0"){
                        this.toast1.showToast(data.message);
                        return false;
                    }else if(data.data==0){
                        this.toast1.showToast(lanStore.getAttr('language').alertSalary);
                    }else{
                        _.each(data.data,function(value, key, list){
                            calendarData.push(SalaryCalendarModel.viewCModel(value.id,'','',''));
                        });

                        $('#input_month')[0].innerHTML = calendarData[0].id;

                        //获取薪资基本信息

                        demodataBasic = [];
                        if (!this.grouplistBasic) {
                            this.showSalaryDetail();
                        }


                    }
                },
                function(e){
                    console.log(e);
                    //todo with error information
                },
                this,
                function(e){},
                {}
            );
        },

        events: {
            'click #selectMonth':'selectMonth_fun',
            'click #pie_chart_btn':'pieChartShow'
        },

        pieChartShow:function(){
            $('.pieChart').toggle();
        },
        pieChart: function(pieData){
//            console.log("pieChart");
//            this.valueslist = [{
//                name: '工资',
//                value: 79
//            }, {
//                name: '奖金',
//                value: 20
//            }, {
//                name: '社保',
//                value: 30
//            }];
            this.valueslist = pieData;

            var scope = this;
            var total = 0,data = [];
            for(var i = 0;i <this.valueslist.length;i++)
                total += this.valueslist[i].value;
            for(var i = 0;i <scope.valueslist.length;i++)
                data.push([scope.valueslist[i].name,parseFloat(scope.valueslist[i].value/total)]);
            this.chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'pieChart',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    marginRight: 0,
                    marginBottom: 0,
                    width:300,
                    height:350
                },
                title: {
                    text: ''
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
                    name: lanStore.getAttr('language').share,
                    data: data
                }],
                credits: {
                    enabled: false
                }
            });

        },
        formatNum:function(num){
            if(typeof num!="string" && num != undefined){
                return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            }else{
                return num;
            }
        },

        selectMonth_fun: function(){
            if (!this.selectMonth_radio) {
                var demodata1 = calendarData,// [{ 'id':'2014-6'}, { 'id':'2014-5'}, {'id':'2014-4' }, {'id':'2014-3' },{'id':'2014-2' }, {'id':'2014-1' }]

                    scope = this;
                this.selectMonth_radio = new UIRadioList({
                    //数据模型
                    datamodel: {
                        title: lanStore.getAttr('language').ChooseDate,
                        data: demodata1
                    },
                    displayNum: 5,
                    selectId: 0,
                    index: 0,
                    onClick: function(e, data) {
                        scope.$('#input_month')[0].innerHTML=data.id;
                        $("#basic_salary_wrap .form-item-li").remove()
                        scope.showSalaryDetail();
                        this.hide();
                    }
                });
                this.selectMonth_radio.setIndex(0);
            }
            this.selectMonth_radio.show();
        },

        onPreShow: function () {
            this.turning();
        },

        showSalaryDetail: function(){
            scope = this;
            pieData = [];
            var basicInfoModel = SalaryBasicInfoModel.getInstance();
            basicInfoModel.execute(
                function(data) {
                    var _this = this;
                    if(data.status == "0"){
                        this.toast1.showToast(data.message);
                        return false;
                    }else{
                        this.loading1.show();
                        var num = 0;
                        _.each(data.data,function(value, key, list){
                             if(value.items){
                                 value.currency != undefined?currency02 = lanStore.getAttr('language').PBrackets + value.currency+ lanStore.getAttr('language').ABrackets + lanStore.getAttr('language').Colon : currency02 = lanStore.getAttr('language').Colon
                                 _this.color = value.color;
                                 var value =value.items;

                            }else{
                                value.currency != undefined?currency02 =lanStore.getAttr('language').PBrackets + value.currency+ lanStore.getAttr('language').ABrackets + lanStore.getAttr('language').Colon : currency02 = lanStore.getAttr('language').Colon
                             }
                            // 暂时先跳过说明的数据，将该数据和总和的数据放在一起
                            if(value.length&&typeof (value)=='string'){
                                return;
                            }
//                            if(num == 0){
//                                $('#basicInfo')[0].innerHTML = key;
//                                _.each(value,function(value){
//                                    demodataBasic.push({"gname":"","name":value.item,"content":value.value,"data":[],"directUrl":false});
//                                })
//                                if(!this.grouplistBasic){
//                                    this.grouplistBasic = new UIGroupList({
//                                        datamodel: {
//                                            data: demodataBasic
//                                        },
//                                        wrapper: this.$('.wrap-basic')
//                                    });
//                                    this.grouplistBasic.show();
//                                }
//                            }else{
                            if(value.code!="total_summary"){
                                $("#basic_salary_wrap").append(_.template($(basic_salary_tpl).html())({'basic_salaryTitle': key+currency02,'basic_salaryCon':value,'basic_salaryId':'basic_salary0'+num,'basic_salaryColor':_this.color}));
                            };

                                   var grouplist = "grouplist"+num,
                                       groupData =  "groupData"+ num;

                                    var groupData = [];
                                if(value.length){
                                    if(typeof (value)=='string'){
                                        groupData.push({"gname":"","name":'',"content":'',"data":[],"directUrl":false,"style":'font-weight:bold',additionInfo:''});
                                    }else{
                                        var pieName = key;
                                        _.each(value,function(value){
                                            if(value.code){
                                                if(_this.color == "BLUE"){
                                                    var style="color:#00bbd3;font-weight:bold",divBG="BLUE-title-bg";

                                                }else if(_this.color == "RED"){
                                                    var style="color:#FF3E3E;font-weight:bold",divBG="RED-title-bg";
                                                }else{
                                                    var style="color:#3ABC2B;font-weight:bold",divBG="GREEN-title-bg";
                                                }
                                                groupData.push({"gname":"","name":value.item,"content":scope.formatNum(value.value),"data":[],"directUrl":false,"style":style,"divBG":divBG});
                                            }else{
                                                groupData.push({"gname":"","name":value.item,"content":scope.formatNum(value.value),"data":[],"directUrl":false});
                                            }
                                            pieData.push({name:value.item,value:Math.abs(value.value)});
                                        })
                                    }
                                }else{
                                    if(value.show||value.show===undefined){
                                        $("#salary_total_wrap").children().remove();
                                        $("#salary_total_wrap").append(_.template($(basic_salary_tp0).html())({'total_salaryTitle':value.item + lanStore.getAttr('language').PBrackets + value.currency +lanStore.getAttr('language').ABrackets + lanStore.getAttr('language').Colon,'total_salaryVal':scope.formatNum(value.value)}));
                                    }else{
                                        $("#salary_total_wrap").remove();
                                    }
                                    $("#aboutCDP")[0].innerHTML = CDPnotes;
                                }

                                    this.grouplist = new UIGroupList({
                                        datamodel: {
                                            data: groupData
                                        },
                                        wrapper: this.$('#basic_salary0'+num)
                                    });
                                    this.grouplist.show();
//                            }
                            num++;
                            //basicInfo.push(SalaryCalendarModel.viewCModel(value.id,'','',''));
                        });
                        this.pieChart(pieData);
                        this.loading1.hide();
                    }
                },
                function(e){
                    console.log(e);
                    //todo with error information
                },
                this,
                function(e){},
                { 'calendar':$('#input_month')[0].innerHTML}
            );
        },

        onShow: function () {
        },

        onHide: function () {
            if(this.selectMonth_radio)
                this.selectMonth_radio.hide();
        }
    });
});
