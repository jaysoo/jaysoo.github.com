define([
        'jquery',
        'underscore',
        'backbone'
    ], function($, _, Backbone) {
    var Search = Backbone.Model.extend({
        defaults: {
            query: null,
            results: null
        },

        initialize: function() {
            _.bindAll(this, 'refresh');

            // Refresh results when query changes
            this.bind('change:query', this.refresh);
        },

        refresh: function() {
            var query = this.get("query");

            // Only fetch if we have a query set.
            if (!query) {
              this.set({ results: null });
              return;
            }

            // Poll Twitter
            var that = this,
                url = "http://search.twitter.com/search.json?q=" + query + "&callback=?";

            $.getJSON(url, function(data) {
                that.set({ results: data });
            });
        }
    });
    return Search;
})

