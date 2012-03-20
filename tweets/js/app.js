define([
        'jquery',
        'underscore', 
        'backbone',
        'handlebars',
        'synapse',
        'synapse/hooks/object',
        'synapse/hooks/jquery',
        'synapse/hooks/backbone-model',
        'twitter/collections/tweets',
        'twitter/models/searcher',
        'twitter/views/tweetsview'
    ], function($, _, Backbone, Handlebars, Synapse, ObjectHook, jQueryHook, BackboneModelHook, Tweets, Searcher, TweetsView) {

    Synapse.addHooks(jQueryHook, BackboneModelHook, ObjectHook);
    
    // Global application namespace
    var App = {};

    // Tweets for this application
    App.Tweets = new Tweets();
    App.Searcher = new Searcher();

    // Search view that binds the input box value with 
    // the Searcher model's query attribute.
    var SearchView = Backbone.View.extend({
        initialize: function() {
            // Auto data-binding between model and element
            var data = Synapse(this.model),
                query = Synapse($(this.el));
            data.observe(query);

            // Auto-focus on search box
            $(this.el).focus();
        }
    });

    // Main application view
    var AppView = Backbone.View.extend({
        // Use existing DOM element
        el: $('#twitter-app'),

        initialize: function() {
            _.bindAll(this, 'showResults', 'showLoader');

            App.Searcher.bind('change:query', this.showLoader);
            App.Searcher.bind('change:results', this.showResults);

            // Create view for tweets
            this.tweetsView = new TweetsView({
                collection: App.Tweets
            });
            $(this.el).append(this.tweetsView.el);

            this.searchView = new SearchView({
                el: this.$('#query'),
                model: App.Searcher
            });
        },

        showLoader: function() {
            $(this.el).addClass('loading');
        },

        showResults: function(searcher, data) {
            // Refresh tweets collection with source data
            var results = data ? data.results : [];
            App.Tweets.reset(data.results);
            $(this.el).removeClass('loading');
        }
    });

    App.AppView = new AppView();

    return App;
});
