/**
 * Created by Lance.Zhao on 2015/3/20.
 */
define(['View',getViewTemplatePath('PolicyList'),'PolicyModel','LanguageStore'], function (View, viewhtml,PolicyModel,LanguageStore) {
    var lanStore = LanguageStore.getInstance();
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);
            this.els = {
                policyList_tpl: this.$el.find("#policyList_tp")
            };
            $('#policy-title')[0].innerHTML = lanStore.getAttr('language').policy;
            var policyModel = PolicyModel.getInstance();
            policyModel.execute(function(data){
                    var policyListData = [];
                    _.each(data.data,function(value, key, list){
                        policyListData.push(PolicyModel.viewAdModel('',value.title,value.detail_id,value.content));
                        lanStore.setAttr('Policy'+key,value.content);
                    });
                    this.$("#PolicyListU").append(_.template(this.els.policyList_tpl.html())({'policy_list_data':policyListData}));
                },
                function(e){
                    console.log(e);
                    //todo with error information
                },
                this);
        },

        events: {
            'touchstart .policy-item-list': function(e){
                $(e.currentTarget).addClass('cur');
            },
            'touchend .policy-item-list': function(e){
                $(e.currentTarget).removeClass('cur');
            },
            'touchcancel .policy-item-list': function(e){
                $(e.currentTarget).removeClass('cur');
            },
            'click .policy-item-list':function(e){
                this.forward('Policy_Detail&'+e.currentTarget.attributes["policy-id"].value);
            }
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
