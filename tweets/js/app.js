/*
 * The main application module
 */
define([
        'jquery',
        'underscore', 
        'backbone',
        'handlebars',
        'synapse',
        'synapse/hooks/object',
        'synapse/hooks/jquery',
        'synapse/hooks/backbone-model',
        'mixins',
        'twitter/collections/tweets',
        'twitter/models/searcher',
        'twitter/views/tweetsview',
        'twitter/views/searcherview',
        'timer/models/timer',
        'timer/views/timerview'
    ], function($, _, Backbone, Handlebars, Synapse, ObjectHook, jQueryHook, BackboneModelHook, 
        Mixins, Tweets, Searcher, TweetsView, SearcherView, Timer, TimerView) {

    // For data-binding support between Backbone and jQuery objects
    Synapse.addHooks(jQueryHook, BackboneModelHook, ObjectHook);
    
    // Application namespace object to be returned
    var App = {};

    // Tweets for this application
    App.Tweets = new Tweets();
    
    // Model for performing searches
    App.Searcher = new Searcher();

    // Timer for auto-refreshing support
    App.Timer = new Timer();

    // Main application view
    var AppView = Backbone.View.extend({

        // Use existing DOM element instead of creating a new one
        el: $('#twitter-app'),

        initialize: function() {
            // Make sure that 'this' is pointed to this AppView instance for the following functions
            _.bindAll(this, 'displayResults', 'showLoader', 'updateTimer', 'toggleTimer', 'clearResults');

            // Setup handlers for events of interest
            App.Searcher.bind('ajax:before', this.showLoader);
            App.Searcher.bind('change:query', this.updateTimer);
            App.Searcher.bind('change:query', this.clearResults);
            App.Searcher.bind('change:results', this.displayResults);
            App.Timer.bind('change:started', this.toggleTimer);
            App.Timer.bind('alarm', App.Searcher.refresh);

            // Timer view for the countdown between refreshes
            this.timerView = new TimerView({
                // Use existing DOM element
                el: this.$('.timer'),
                model: App.Timer
            });

            // Main tweets view for results
            this.tweetsView = new TweetsView({
                // Use existing DOM element
                el: this.$('.tweets'),
                collection: App.Tweets
            });

            // Input box for the live search
            this.searcherView = new SearcherView({
                // Use existing DOM element
                el: this.$('#search-form'),
                model: App.Searcher
            });

            // Data-binding between the query <span> in the countdown and the Seacher's query attribute
            Synapse(this.timerView.$('span[name=query]')).observe(App.Searcher);
        },

        showLoader: function() {
            $(this.tweetsView.el).addClass('loading');
        },

        updateTimer: function() {
            // Reset timer
            App.Timer.resetTime();

            // If query is empty/null then stop timer, else start timer
            if (App.Searcher.get('query')) {
                App.Timer.start();
            } else {
                App.Timer.stop();
            }
        },

        clearResults: function() {
            this.clearBuffer();
            // Remove previous tweets
            App.Tweets.reset([]);
        },

        // Queue display in the buffer
        // Use shift=true so the most recent call is at the front of the queue
        displayResults: function(searcher, data) {
            var that = this;
            this.buffer(function(next) {
                // Refresh tweets collection with source data
                var results = data ? data.results : [];
                App.Tweets.reset(results);
                // Remove loading indicator
                $(that.tweetsView.el).removeClass('loading');
                // Only execute the most recent callback, remove the rest
                that.clearBuffer();
            }, { shift: true });
        },

        // When timer starts or stops, we want to show or hide the timer view respectively
        toggleTimer: function() {
            if (App.Timer.get('started'))
                $(this.timerView.el).show();
            else
                $(this.timerView.el).hide();
        }
    });
    _.extend(AppView.prototype, Mixins.Buffer);

    // Create AppView and return the App namespace
    App.View = new AppView();
    return App;
});
