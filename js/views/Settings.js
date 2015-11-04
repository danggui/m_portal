/**
 * Created by Lance.Zhao on 2015/4/08.
 */
define(['View',getViewTemplatePath('Settings')], function (View, viewhtml) {
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);
        },

        events: {
            'click .language-settings-page':'languageSettings',
            'click .password-settings-page':'passwordSettings'
        },
        languageSettings: function(){
            this.$(".language-settings-page").find('.triangle-icon').toggleClass("triangle-icon-down");
            this.$(".language-settings-page").find('.triangle-icon').toggleClass("triangle-icon-up");
            this.$(".language-settings-page").next('ul').toggleClass("ul-list-nav");
        },
        passwordSettings: function(){
            this.$(".password-settings-page").find('.triangle-icon').toggleClass("triangle-icon-down");
            this.$(".password-settings-page").find('.triangle-icon').toggleClass("triangle-icon-up");
            this.$(".password-settings-page").next('ul').toggleClass("ul-list-nav");
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
