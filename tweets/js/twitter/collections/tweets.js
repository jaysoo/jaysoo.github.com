define([
        'underscore',
        'backbone',
        '../models/tweet'
    ], 
    function(_, Backbone, Tweet) {
    var Tweets = Backbone.Collection.extend({
        model: Tweet,

        // Keep track of unique tweets
        _idCache: null,

        initialize: function() {
            this._idCache = {};
        },
        
        // Override the default add function so we don't add a tweet
        // with the same ID twice.
        add: function(sources, options) {
            var that = this;
            if (sources instanceof Backbone.Collection) {
                sources.each(function(source) {
                    that._addIfUnique(source, options);
                });
            } else if (_.isArray(sources)) {
                _.each(sources, function(source) {
                    that._addIfUnique(source, options)
                });
            } else {
                this._addIfUnique(sources, options)
            }
        },

        _addIfUnique: function(source, options) {
            var id = source instanceof Backbone.Model ? source.get('id') : source.id;

            // Only add this if the id hasn't been loaded yet
            if (this._idCache[id] === undefined) {
                this.constructor.__super__.add.call(this, source, options);
                this._idCache[id] = source.cid;
            }
        }
    });
    return Tweets;
});
