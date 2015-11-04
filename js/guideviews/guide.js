/**
 * Created by Patrick.Fang on 2014/9/28.
 */
define(['AbstractView', getGuideViewTemplatePath('guide'), 'UIGroupList'], function (View, viewhtml, UIGroupList) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
      this.initElement();

      this.TXTTIMERRES = null;

    },

    initElement: function () {
      this.cancelBtn = this.$('.ctui-btn-cancle');
      this.searchBox = this.$('.ctui-input-box');
      this.txtWrapper = this.$('.ctui-hd');
      this.searchList = this.$('.seach-list');

    },

    events: {
      'focus .ctui-input-box': 'seachTxtFocus',
      'click .sss': function () {
      },
      'click .ctui-btn-cancle': function () {
        this.closeSearch();
      },
      'click .seach-list>li': function (e) {
        var gindex = $(e.currentTarget).attr('data-group');
        var index = $(e.currentTarget).attr('data-index');

        this.forward(this.uidata[gindex].data[index].uiname);
      }
    },

    seachTxtFocus: function (e) {
      this.openSeach();

    },

    closeSearch: function () {
      this.txtWrapper.removeClass('ctui-input-focus');
      this.groupList.show();
      this.searchList.hide();
      this.searchBox.val('');

    },

    //开启搜索状态
    openSeach: function () {
      if (this.TXTTIMERRES) return;

      this.TXTTIMERRES = setInterval($.proxy(function () {
        //        console.log(1);
        //如果当前获取焦点的不是input元素的话便清除定时器
        if (!this.isInputFocus()) {
          if (this.TXTTIMERRES) {
            clearInterval(this.TXTTIMERRES);
            this.TXTTIMERRES = null;
          }
        }

        var txt = this.searchBox.val().toLowerCase();
        if (txt == '') {
          setTimeout($.proxy(function () {
            if (!this.isInputFocus()) {
              this.closeSearch();
            }
          }, this), 500);
          return;
        }

        this.txtWrapper.addClass('ctui-input-focus');
        this.groupList.hide();
        this.searchList.show();

        var list = this.groupList.getFilterList(txt);
        this.searchList.html(list);


      }, this));


    },

    isInputFocus: function () {
      if (document.activeElement.nodeName == 'INPUT' && document.activeElement.type == 'text')
        return true;
      return false;
    },

    initGoupList: function () {
      if (this.groupList) return;
      var scope = this;

      //提示类
      var groupList1 = [
        { 'uiname': 'typography', 'content': '文本' },
        { 'uiname': 'icons', 'content': '图标' },
        { 'uiname': 'controls', 'content': '控件' },
        { 'uiname': 'form', 'content': '表单' }
//        { 'uiname': 'loading', 'name': 'loading框' },
//        { 'uiname': 'reloading', 'name': 'reloading框' },
//        { 'uiname': 'bubble.layer', 'name': '气泡框提示' },
//        { 'uiname': 'warning404', 'name': '404提醒' }
      ];

      var groupList2 = [
        { 'uiname': 'alert', 'content': 'alert组件' },
        { 'uiname': 'toast', 'content': 'Toast组件' },
        { 'uiname': 'loading', 'content': 'Loading组件' },
        { 'uiname': 'bubble.layer', 'content': 'Bubble组件' },
        { 'uiname': 'select', 'content': 'Select组件' },
        { 'uiname': 'switch', 'content': 'Switch组件' },
        { 'uiname': 'tab', 'content': 'Tab组件' },
        { 'uiname': 'group.list', 'content': '分组列表' }
//        { 'uiname': 'select', 'name': 'select组件' },
//        { 'uiname': 'select2', 'name': 'select应用' },
//        { 'uiname': 'switch', 'name': 'switch组件' },
//        { 'uiname': 'tab', 'name': 'tab组件' },
//        { 'uiname': 'calendar', 'name': '日历组件' },
//        { 'uiname': 'group.list', 'name': '分组列表' }
      ];
//
      var groupList3 = [
//        { 'uiname': 'radio.list', 'name': '单列表选择组件' },
//        { 'uiname': 'scroll.layer', 'name': '滚动层组件' },
//        { 'uiname': 'group.select', 'name': '日期选择类组件' },
//        { 'uiname': 'scroll', 'name': '滚动组件/横向滚动' }
        { 'uiname': 'scroll.across','content':'横向滚动条'}
      ];
//
//      var groupList4 = [
//        { 'uiname': 'lazyload', 'name': '图片延迟加载' },
//        { 'uiname': 'inputclear', 'name': '带删除按钮的文本框(todo...)' },
//        { 'uiname': 'validate1', 'name': '工具类表单验证' },
//        { 'uiname': 'validate2', 'name': '集成表单验证(todo...)' },
//        { 'uiname': 'filp', 'name': '简单flip手势工具' }
//      ];

      var uidata = [
        { name: '样式集合', data: groupList1 },
        { name: '常用组件', data: groupList2 },
        { name: '滚动类组件', data: groupList3 }
//        { name: '全局类', data: groupList4 }
      ];

      this.uidata = uidata;

      this.groupList = new UIGroupList({
        datamodel: {
          data: uidata,
          filter: 'uiname,content'
        },
        wrapper: this.$('.ctui-bd'),
        onItemClick: function (item, groupIndex, index, e) {
          scope.forward(item.uiname);
        }
      });


      this.groupList.show();

    },

    onPreShow: function () {
      this.initGoupList();
      this.turning();
    },

    onShow: function () {




    },

    onHide: function () {

    }

  });
});
