/**
 * Created by Lance.Zhao on 2015/3/20.
 */
define(['View',getViewTemplatePath('commercialInsurance'),'UISlide','LanguageStore'], function (View, viewhtml,UISlide,LanguageStore) {
    var lanStore = LanguageStore.getInstance();
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);
            $('#insurance-title')[0].innerHTML = lanStore.getAttr('language').commercialInsurance;
            this.$("#insurance_box").append(_.template(this.$("#commercialInsurance").html())({'lanStore':lanStore.getAttr('language')}));

        },

        events: {
        },
        onPreShow: function () {
            this.turning();
        },

        onShow: function () {
            if(this.slider) this.slider._resize();
        },

        onHide: function () {

        }
    });
});
