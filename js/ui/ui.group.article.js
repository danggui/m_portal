/*
 对select组件的使用，当前最复杂的组件

 */
define(['UILayer', getViewTemplatePath('ui/ui.group.article'), 'UISelect'], function (UILayer, template, UISelect) {


    return _.inherit(UILayer, {
        propertys: function ($super) {
            $super();
            //html模板
            this.template = template;

            this.datamodel = {
                title: 'scrollLayer',
                btns: [
                    { name: 'cancel', className: 'pop-box-btns-cancel' },
                    { name: 'ok', className: 'pop-box-btns-ok' }
                ]
            };

            this.data = [];
            this.indexArr = [0, 0, 0];
            this.idArr = [];
            this.scrollArr = [];
            this.changedArr = [
                function (item) {
                    console.log(item);
                },
                function (item) {
                    console.log(item);
                },
                function (item) {
                    console.log(item);
                }
            ];

            this.onOkAction = function (items) {
                console.log('ok');
                console.log(items);

            };

            this.onCancelAction = function (items) {
                console.log('cancel');
                console.log(items);

            };

            //这里便只有一个接口了
            this.displayNum = 3;

            this.events = {
                'click .pop-box-btns-ok': 'okAction',
                'click .pop-box-btns-cancel': 'cancelAction'
            };

        },

        okAction: function (e) {
            var items = [];
            for (i = 0, len = this.scrollArr.length; i < len; i++) {
                items.push(this.scrollArr[i].getSelected());
            }
            this.onOkAction.call(this, items);
        },

        cancelAction: function (e) {
            var items = [];
            for (i = 0, len = this.scrollArr.length; i < len; i++) {
                items.push(this.scrollArr[i].getSelected());
            }
            this.onCancelAction.call(this, items);
        },

        initElement: function () {
            this.scrollWrapper = this.$('.btn-h-group');
        },


        _initScroll: function () {
            this._destroyScroll();
            var i, len, item;
            for (i = 0, len = this.data.length; i < len; i++) {
                item = this.data[i];

                this.scrollArr[i] = new UISelect({
                    datamodel: {
                        data: item,
                        index: this.indexArr[i],
                        id: this.idArr[i]
                    },
                    displayNum: this.displayNum,
                    changed: $.proxy(this.changedArr[i], this),
                    wrapper: this.scrollWrapper
                });
                this.scrollArr[i].$el.addClass("flex-btn");
                this.scrollArr[i].show();
            }
        },

        _destroyScroll: function () {
            var i, len;
            for (i = 0, len = this.data.length; i < len; i++) {
                if (this.scrollArr[i]) {
                    this.scrollArr[i].hide();
                    this.scrollArr[i] = null;
                }
            }

        },

        initialize: function ($super, opts) {
            $super(opts);
        },

        addEvent: function ($super) {
            $super();

            this.on('onCreate',function(){
                this.$el.addClass('ct-ui-alert');
            },1);

            //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
            this.on('onShow', function () {
                this._initScroll();

            }, 1);

            this.on('onHide', function () {
                this._destroyScroll();

            }, 1);

        }

    });

});
