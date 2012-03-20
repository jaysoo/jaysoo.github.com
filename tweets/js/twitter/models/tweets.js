define([
        'backbone',
        '../models/tweet'
    ], 
    function(Backbone, Tweet) {
    var Tweets = Backbone.Collection.extend({
        model: Twitter.Tweet,

        // Keep track of unique tweets
        _idCache: null,

        initialize: function() {
            this._idCache = {};
        },
        
        add: function(tweet) {
            var id = tweet.get('id');

            // Only add this if the id hasn't been loaded yet
            if (this._idCache[id] === undefined) {
                console.log(this.constructor.__super__)
                this.constructor.__super__.add.call(this, tweet);
                this._idCache[id] = tweet.cid;
            }
        }
    });
    return Tweets;
});
