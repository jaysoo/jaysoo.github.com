define([
        'jquery',
        'underscore', 
        'backbone',
        'handlebars',
        'twitter/collections/tweets',
        'twitter/models/search',
        'twitter/views/tweetsview'
    ], function($, _, Backbone, Handlebars, Tweets, Search, TweetsView) {
    
    // Global application namespace
    var App = {};

    // Tweets for this application
    App.Tweets = new Tweets();
    App.Search = new Search();

    // Main application view
    var AppView = Backbone.View.extend({
        // Use existing DOM element
        el: $('#twitter-app'),

        initialize: function() {
            _.bindAll(this, 'onResultsChange', 'render');

            App.Search.bind('change:query', this.render);
            App.Search.bind('change:results', this.onResultsChange);

            // Create view for tweets
            this.tweetsView = new TweetsView({
                collection: App.Tweets
            });
            $(this.el).append(this.tweetsView.el);

            App.Search.set({ query: 'bieber' });
        },

        render: function() {
            //this.$('h2').text(App.Search.get('query'));
            return this;
        },

        onResultsChange: function(search, data) {
            // Refresh tweets collection with source data
            App.Tweets.reset(data.results);
        }
    });

    App.AppView = new AppView();

    return App;
});
