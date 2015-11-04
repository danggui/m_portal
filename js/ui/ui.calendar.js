
define(['UIView', getViewTemplatePath('ui/ui.calendar')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.dateObj = new Date();

      //要求必须要传入日期对象
      this.datamodel = {
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        monthnameArr:  ["January","February","March","April","May","June","July","August","September","October","November","December" ],
        displayMonthNum: 5,
        curTime: (new Date(this.dateObj.getFullYear(), this.dateObj.getMonth(), this.dateObj.getDate())).getTime(),
        //分割月之间的显示
        MonthClapFn: function (year, month) {
          month = month + 1;
          return year + '年' + (month)+'月';
        },
        //具体显示项目定制化
        dayItemFn: function (year, month, day) {
          return day;
        }
      };

      this.events = {
        'click .ct-ui_calendar_item': 'itemAction',
        'click .previous ': 'preAction',
        'click .next ': 'nextAction'

      };

      this.onItemClick = function (date, e) {
        //console.log(arguments);
        this.wrapper.find('[data-date]').removeClass("ct-ui_cld_day_NOW");
        $(e.target).addClass('ct-ui_cld_day_NOW');
      };

    },

    //要求唯一标识，根据id确定index
    resetPropery: function () {
      this.datamodel.year = this.dateObj.getFullYear();
      this.datamodel.month = this.dateObj.getMonth();

    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var date = el.attr('data-date');
      date = date.split('-');
      if (date.length != 3) return false;

      date = new Date(date[0], date[1], date[2]);

      if (this.onItemClick) this.onItemClick.call(this, date, e);
    },

    preAction: function (e) {
      var el = $(e.currentTarget);
      var date = el.attr('data-date');
      date = date.split('-');
      if (date.length != 2) return false;

      date = new Date(date[0], parseInt(date[1])-1,1);
      this.datamodel.curTime = date.getTime();
      this.dateObj = date;
      this.refresh();
    },

    nextAction: function (e) {
      var el = $(e.currentTarget);
      var date = el.attr('data-date');
      date = date.split('-');
      if (date.length != 2) return false;

      date = new Date(date[0], parseInt(date[1])-1,1);

      this.datamodel.curTime = date.getTime();
      this.dateObj = date;
      this.refresh();
    },

    initElement: function () {
      this.weekDay = this.$('.ct-ui_cldweek');
      var monthname =new Array ("January","February","March","April","May","June","July","August","September","October","November","December" );
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });


});
