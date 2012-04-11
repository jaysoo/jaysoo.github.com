/*
 * A repository type of object that performs searches against the public Twitter API.
 */
define([
        'jquery',
        'underscore',
        'backbone'
    ], function($, _, Backbone) {
    var Search = Backbone.Model.extend({
        searchUrl: 'http://search.twitter.com/search.json',

        defaults: {
            query: null,
            results: null
        },

        initialize: function() {
            _.bindAll(this, 'onQueryChange', 'refresh', 'loadData');
            this.bind('change:query', this.onQueryChange);
        },

        onQueryChange: function() {
            // Query URL
            this.url = this.searchUrl + '?q=' + encodeURIComponent(this.get('query')) + '&callback=?';
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

            // Event for those interested...
            this.trigger('ajax:before');

            // Fetch data
            $.getJSON(this.url, this.loadData);
        },

        // Waits 200 ms before execution
        // When called repeated, will only execute the last loadData
        loadData: _.debounce(function(data) {
            // Event for those interested...
            this.trigger('ajax:after');
            this.set({ results: data });
        }, 200)
    });
    return Search;
})

