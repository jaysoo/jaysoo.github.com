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
        
        add: function(sources, options) {
            var that = this;
            if (_.isArray(sources)) {
                _.each(sources, function(source) {
                    that._addIfUnique(source, options)
                });
            } else {
                this._addIfUnique(sources, options)
            }
        },

        _addIfUnique: function(source, options) {
            var id = source.id;

            // Only add this if the id hasn't been loaded yet
            if (this._idCache[id] === undefined) {
                this.constructor.__super__.add.call(this, source, options);
                this._idCache[id] = source.cid;
            }
        }
    });
    return Tweets;
});
