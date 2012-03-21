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
    
    // Model for performing searches
    App.Searcher = new Searcher();

    // Search view that binds the input box value with 
    // the Searcher model's query attribute.
    var SearchView = Backbone.View.extend({
        events: {
            'click .close': 'clearSearch'
        },

        initialize: function() {
            this.$queryInput = this.$('[name=query]');

            // Data-binding between model and element
            var data = Synapse(this.model),
                query = Synapse(this.$queryInput);
            data.observe(query);
            query.observe(data);

            // Auto-focus on search box
            this.$queryInput.focus();
        },

        clearSearch: function() {
            this.model.set({ query: '' });
        }
    });

    // Main application view
    var AppView = Backbone.View.extend({
        // Use existing DOM element
        el: $('#twitter-app'),

        // Amount of time in between pulls
        refreshInterval: 5000,

        // For setInterval
        t: null,

        initialize: function() {
            _.bindAll(this, 'displayResults', 'showLoader', 'hideLoader', 'onQueryChange');

            App.Searcher.bind('ajax:before', this.showLoader);
            App.Searcher.bind('ajax:after', this.hideLoader);
            App.Searcher.bind('change:query', this.onQueryChange);
            App.Searcher.bind('change:results', this.displayResults);

            // Create view for tweets
            this.tweetsView = new TweetsView({
                collection: App.Tweets
            });
            $(this.el).append(this.tweetsView.el);

            this.searchView = new SearchView({
                el: this.$('#search-form'),
                model: App.Searcher
            });

            this.t = setInterval(App.Searcher.refresh, 10000);
        },

        showLoader: function() {
            $(this.tweetsView.el).addClass('loading');
        },

        hideLoader: function() {
            $(this.tweetsView.el).removeClass('loading');
        },

        onQueryChange: function() {
            App.Tweets.reset([]);
        },

        displayResults: function(searcher, data) {
            // Refresh tweets collection with source data
            var results = data ? data.results : [];
            App.Tweets.add(results, { at: 0 });
        }
    });

    App.AppView = new AppView();

    return App;
});
