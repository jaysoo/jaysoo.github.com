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
        'twitter/views/tweetsview',
        'timer/models/timer',
        'timer/views/timerview'
    ], function($, _, Backbone, Handlebars, Synapse, ObjectHook, jQueryHook, BackboneModelHook, 
        Tweets, Searcher, TweetsView, Timer, TimerView) {

    Synapse.addHooks(jQueryHook, BackboneModelHook, ObjectHook);
    
    // Global application namespace
    var App = {};

    // Tweets for this application
    App.Tweets = new Tweets();
    
    // Model for performing searches
    App.Searcher = new Searcher();

    App.Timer = new Timer();

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

        initialize: function() {
            _.bindAll(this, 'displayResults', 'showLoader', 'hideLoader', 'onQueryChange', 'toggleTimer');

            App.Searcher.bind('ajax:before', this.showLoader);
            App.Searcher.bind('ajax:after', this.hideLoader);
            App.Searcher.bind('change:query', this.onQueryChange);
            App.Searcher.bind('change:results', this.displayResults);

            App.Timer.bind('change:started', this.toggleTimer);

            this.timerView = new TimerView({
                model: App.Timer,
                el: this.$('.timer')
            });

            this.tweetsView = new TweetsView({
                collection: App.Tweets,
                el: this.$('.tweets')
            });

            this.searchView = new SearchView({
                el: this.$('#search-form'),
                model: App.Searcher
            });

            App.Timer.bind('alarm', App.Searcher.refresh);

            Synapse(this.timerView.$('span[name=query]')).observe(App.Searcher);
        },

        showLoader: function() {
            $(this.tweetsView.el).addClass('loading');
        },

        hideLoader: function() {
            $(this.tweetsView.el).removeClass('loading');
        },

        onQueryChange: function() {
            App.Tweets.reset([]);
            App.Timer.resetTime();
            if (App.Searcher.get('query')) {
                App.Timer.start();
            } else {
                App.Timer.stop();
            }
        },

        displayResults: function(searcher, data) {
            // Refresh tweets collection with source data
            var results = data ? data.results : [];
            App.Tweets.add(results, { at: 0 });
        },

        toggleTimer: function() {
            if (App.Timer.get('started')) {
                $(this.timerView.el).show();
            } else {
                $(this.timerView.el).hide();
            }
        }
    });

    App.AppView = new AppView();

    return App;
});
