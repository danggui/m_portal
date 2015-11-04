/**
 * Created by Lance.Zhao on 2015/4/08.
 */
define(['View',getViewTemplatePath('Settings-language')], function (View, viewhtml) {
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);
        },

        events: {
            'click #btnCancel':function () {this.back();},
            'click #btnOk':function () {this.forward("MyProfile")},
            'click .language-settings':'languageSettings'
        },
        languageSettings: function(e){
            if($(".language-settings-nav")){
                $(".language-settings-nav").removeClass("language-settings-nav");
            }
            var trigger = $(e.currentTarget);
            $(trigger).addClass("language-settings-nav");
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
