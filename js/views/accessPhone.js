define(['View',getViewTemplatePath('accessPhone'),'UIToast','LanguageStore'], function (View, viewhtml,UIToast,LanguageStore) {

    var lanStore = LanguageStore.getInstance();

    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);
            this.$("#ChangePWD-box").append(_.template(this.$("#ChangePWD").html())({'lanStore':lanStore.getAttr('language')}));
        },

        events: {

        },
        onPreShow: function () {
            this.turning();
        },

        onShow: function () {

        },

        onHide: function () {

        }
    });
});
