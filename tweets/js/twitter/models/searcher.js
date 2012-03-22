/*
 * A repository type of object that performs searches against the public Twitter API.
 */
define([
        'jquery',
        'underscore',
        'backbone'
    ], function($, _, Backbone) {
    var Search = Backbone.Model.extend({
        baseUrl: 'http://search.twitter.com/search.json',

        defaults: {
            query: null,
            results: null
        },

        initialize: function() {
            _.bindAll(this, 'onQueryChange', 'refresh', 'loadData');

            // Refresh results when query changes
            this.bind('change:query', this.onQueryChange);
        },

        onQueryChange: function() {
            // Initial query URL
            // Once data returns, we can grab the "refresh_url" data for future tweets using the same query
            this.url = this.baseUrl + '?q=' + encodeURIComponent(this.get('query')) + '&callback=?';
            // Pull in data
            this.refresh();
        },

        refresh: function() {
            // Current query
            var query = this.get('query');

            // Only fetch if we have a query set.
            if (!query) {
              this.set({ results: null });
              return;
            }

            var that = this,
                data = this.get('results');

            // Event for those interested...
            this.trigger('ajax:before');

            // Fetch data
            $.getJSON(this.url, this.loadData);
        },

        // Waits 500 ms before execution
        // When called repeated, will only execute the last loadData
        loadData: _.debounce(function(data) {
            // Event for those interested...
            this.trigger('ajax:after');
            this.set({ results: data });
            // Use the URL provided by Twitter for subsequent fetches to same query
            this.url = this.baseUrl + data.refresh_url + '&callback=?';
        }, 500)
    });
    return Search;
})

