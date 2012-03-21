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
        'twitter/views/searcherview',
        'timer/models/timer',
        'timer/views/timerview'
    ], function($, _, Backbone, Handlebars, Synapse, ObjectHook, jQueryHook, BackboneModelHook, 
        Tweets, Searcher, TweetsView, SearcherView, Timer, TimerView) {

    Synapse.addHooks(jQueryHook, BackboneModelHook, ObjectHook);
    
    // Global application namespace
    var App = {};

    // Tweets for this application
    App.Tweets = new Tweets();
    
    // Model for performing searches
    App.Searcher = new Searcher();

    App.Timer = new Timer();

    // Main application view
    var AppView = Backbone.View.extend({
        // Use existing DOM element
        el: $('#twitter-app'),

        // Amount of time in between pulls
        refreshInterval: 5000,

        initialize: function() {
            _.bindAll(this, 'displayResults', 'showLoader', 'onQueryChange', 'toggleTimer');

            App.Searcher.bind('ajax:before', this.showLoader);
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

            this.searcherView = new SearcherView({
                el: this.$('#search-form'),
                model: App.Searcher
            });

            App.Timer.bind('alarm', App.Searcher.refresh);

            Synapse(this.timerView.$('span[name=query]')).observe(App.Searcher);
        },

        showLoader: function() {
            $(this.tweetsView.el).addClass('loading');
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

        displayResults: _.debounce(function(searcher, data) {
            // Refresh tweets collection with source data
            var results = data ? data.results : [];
            App.Tweets.add(results, { at: 0 });
            $(this.tweetsView.el).removeClass('loading');
        }, 300),

        toggleTimer: function() {
            if (App.Timer.get('started')) {
                $(this.timerView.el).show();
            } else {
                $(this.timerView.el).hide();
            }
        }
    });

    App.View = new AppView();
    return App;
});
