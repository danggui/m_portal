define(['View', getGuideViewTemplatePath('group.list'), 'UIGroupList','UIScrollX'], function (View, viewhtml, UIGroupList,UIScrollX) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
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
      var scope = this;
      //简单初始化
      if (!this.grouplist) {
        var demodata1 = [], groupList1, groupList2, groupList3;
        groupList1 = [
          { 'gname': 'iphone4', 'name': 'Apple iphone4' },
          { 'gname': 'iphone5', 'name': 'Apple iphone5' },
          { 'gname': 'iphone5s', 'name': 'Apple iphone5s' }
        ];
        groupList2 = [
          { 'gname': 'ipad3', 'name': 'Apple ipad3' },
          { 'gname': 'ipad4', 'name': 'Apple ipad4' },
          { 'gname': 'ipad5', 'name': 'Apple ipad5' },
          { 'gname': 'ipad-air', 'name': 'Apple ipad Air' }
        ];
        groupList3 = [
          { 'gname': 'mac-pro', 'name': 'Apple Mac-pro' },
          { 'gname': 'mac-air', 'name': 'Apple  Mac-air' }
        ];

        demodata1 = [
          { name: '手机', data: groupList1,needFold:true },
          { name: '平板电脑', data: groupList2 },
          { name: '笔记本', data: groupList3 }
        ];

        this.grouplist = new UIGroupList({
          datamodel: {
            data: demodata1
          },

          wrapper: this.$('.wrapper1')
        });
      }


      this.grouplist.show();

      //参数设置、事件重写
      if (!this.grouplist2) {
        var demodata2 = [], groupList1, groupList2, groupList3;
        groupList1 = [
          { 'gname': 'iphone4', 'name': 'Apple iphone4' },
          { 'gname': 'iphone5', 'name': 'Apple iphone5' },
          { 'gname': 'iphone5s', 'name': 'Apple iphone5s' }
        ];
        groupList2 = [
          { 'gname': 'ipad3', 'name': 'Apple ipad3' },
          { 'gname': 'ipad4', 'name': 'Apple ipad4' }
        ];
        groupList3 = [
          { 'gname': 'mac-pro', 'name': 'Apple Mac-pro' },
          { 'gname': 'mac-air', 'name': 'Apple  Mac-air' }
        ];

        demodata2 = [
          { name: '手机', data: groupList1 },
          { name: '平板电脑', data: groupList2 },
          { name: '笔记本', data: groupList3 }
        ];

        this.grouplist2 = new UIGroupList({
          datamodel: {
            data: demodata2
          },
          onItemClick: function (item, groupIndex, index, e) {
            console.log('自定义点击事件', arguments);
          },
          onGroupClick: function (index, items, e) {
            this.closeGroup();
            this.openGroup(index);
          },
          wrapper: this.$('.wrapper2')
        });
      }
      this.grouplist2.closeGroup();
      this.grouplist2.openGroup(0);
      this.grouplist2.show();

      if (!this.grouplist3) {
        var demodata3 = [
          { gname:'form',name: 'Form', data: [],directUrl:true },
          { gname:'form',name: 'toast', data: [],directUrl:true },
          { gname:'switch',name: 'switch  ', data: [],directUrl:true }
        ];

        this.grouplist3 = new UIGroupList({
          datamodel: {
            data: demodata3
          },
          onGroupClick: function (index, items, e) {
            scope.forward(this.datamodel.data[index].gname);
          },
          wrapper: this.$('.wrapper3')
        });
      }
      this.grouplist3.show();
      this.turning();
    },

    onShow: function () {
      this.initElement();
    },

    onHide: function () {
    }

  });
});
