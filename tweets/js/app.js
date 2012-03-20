define([
        'jquery',
        'underscore', 
        'backbone',
        'handlebars',
        'twitter/collections/tweets',
        'twitter/views/tweetsview'
    ], function($, _, Backbone, Handlebars, Tweets, TweetsView) {
    
    // Global application namespace
    var App = {};

    // Tweets for this application
    App.Tweets = new Tweets();

    // Main application view
    var AppView = Backbone.View.extend({
        // Use existing DOM element
        el: $('#twitter-app'),

        initialize: function(options) {
            options = options || {};

            // Create view for tweets
            this.tweetsView = new TweetsView({
                collection: App.Tweets
            });
            $(this.el).append(this.tweetsView.el);

            App.Tweets.reset([
                { text: 'hello world!' }
            ]);
        },

        render: function() {
            return this;
        }
    });

    App.AppView = new AppView();

    return App;
});
