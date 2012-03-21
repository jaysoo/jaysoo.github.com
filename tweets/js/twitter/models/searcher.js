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
            _.bindAll(this, 'onQueryChange', 'refresh');

            // Refresh results when query changes
            this.bind('change:query', this.onQueryChange);
        },

        onQueryChange: function() {
            this.url = this.baseUrl + '?q=' + this.get('query') + '&callback=?';
            this.refresh();
        },

        refresh: function() {
            var query = this.get('query');

            // Only fetch if we have a query set.
            if (!query) {
              this.set({ results: null });
              return;
            }

            var that = this,
                data = this.get('results');

            this.trigger('ajax:before');

            $.getJSON(this.url, function(data) {
                that.trigger('ajax:after');
                that.set({ results: data });
                that.url = that.baseUrl + data.refresh_url + '&callback=?';
            });
        }
    });
    return Search;
})

