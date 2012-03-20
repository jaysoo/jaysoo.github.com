define([
        'jquery',
        'underscore', 
        'backbone',
        'handlebars',
        'twitter/collections/tweets',
        'twitter/views/tweetsview',
        'text!templates/app.html'
    ], function($, _, Backbone, Handlebars, Tweets, TweetsView, appTemplate){
    var AppView = Backbone.View.extend({
        // Use existing DOM element
        el: $('#twitter-app'),

        // Use async loaded template
        template: Handlebars.compile(appTemplate),

        initialize: function(options) {
            options = options || {};
        },

        render: function() {
            $(this.template({
                heading: 'test'
            })).appendTo(this.el);
            return this;
        }
    });
    return AppView;
});
