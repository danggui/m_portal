/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('MyDashboard'),'UIGroupList'], function (View, viewhtml,UIGroupList) {
  return _.inherit(View,{
    onCreate: function () {
      this.menulist = [{gname:'MyHighChartsD1',name:'月度人数统计图1',data:[],directUrl:true},
        {gname:'MyHighChartsD2',name:'月度人数统计图2',data: [],directUrl:true},
        {gname:'MyHighChartsD3',name:'年度主动离职率统计图',data:[],directUrl:true},
        {gname:'MyHighChartsD4',name:'月度加班统计图',data:[],directUrl:true},
        {gname:'MyHighChartsD5',name:'月度人事费用统计图',data:[],directUrl:true}
      ];

//      this.$el.html(_.template(viewhtml)({'menulist':menulist}));
      this.$el.html(viewhtml);
    },

    events: {
//      'click button': 'dealUrl'
    },

//    dealUrl: function (e) {
//      this.forward($(e.currentTarget).attr('data-value'))
//    },

    onPreShow: function () {
      var scope = this;
      if (!this.grouplist1) {
        this.grouplist1 = new UIGroupList({
          datamodel: {
            data: scope.menulist
          },
          onGroupClick: function (index, items, e) {
            scope.forward(this.datamodel.data[index].gname);
          },
          wrapper: this.$('.wrapper1')
        });
        this.grouplist1.show();
      }
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }
  });
});
