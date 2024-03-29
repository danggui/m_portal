/*
 getFilterList这块需要重新处理，不然事件会丢失
 */
define(['UIView', getViewTemplatePath('ui/ui.group.list.edit')], function (UIView, template) {


    return _.inherit(UIView, {
        propertys: function ($super) {
            $super();
            this.template = template;

            this.datamodel = {
                data: [],
                filter: 'name'
            };

            this.events = {
                'click .ctui-t': 'groupAction',
                'click .ctui-n>li': 'itemAction'
            };

            this.onGroupClick = function (index, items, e) {
            };

            this.onItemClick = function (item, groupIndex, index, e) {
                console.log(arguments);
            };
        },

        itemAction: function (e) {
            var el = $(e.currentTarget);
            var gindex = el.attr('data-group');
            var index = el.attr('data-index');
            var item = this.datamodel.data[gindex].data[index];

            if (this.onItemClick) this.onItemClick.call(this, item, gindex, index, e);
        },

        groupAction: function (e) {
            var el = $(e.currentTarget).parent();
            var index = el.attr('data-groupindex');
            var items = this.datamodel.data[index];

            if (el.hasClass('ctui-arrow-open')) {
                this.closeGroup(index);
            } else {
                this.openGroup(index);
            }

            if (this.onGroupClick) this.onGroupClick.call(this, index, items, e);
        },

        getFilterList: function (key) {
            var list = this.$('li[data-filter*="' + key + '"]');
            return list.clone()
        },

        openGroup: function (i) {
            this._switchStatus(i, 'ctui-arrow-close', 'ctui-arrow-open')
        },

        closeGroup: function (i) {
            this._switchStatus(i, 'ctui-arrow-open', 'ctui-arrow-close')
        },

        _switchStatus: function (i, cls1, cls2) {
            if (typeof i == 'undefined') {
                this.groups.removeClass(cls1);
                this.groups.addClass(cls2);
                return;
            }
            var el = this.$('li[data-groupindex="' + i + '"]')
            el.addClass(cls2);
            el.removeClass(cls1);
        },

        initElement: function () {
            this.groups = this.$('.ctui-itmes>li');
        },

        initialize: function ($super, opts) {
            $super(opts);
        }

    });

});
