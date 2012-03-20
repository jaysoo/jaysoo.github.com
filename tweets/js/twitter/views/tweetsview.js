define([
        'jquery', 
        'underscore', 
        'backbone',
        '../models/tweet',
        '../collections/tweets',
        './tweetview'
    ], function($, _, Backbone, Tweet, Tweets, TweetView){
    var TweetsView = Backbone.View.extend({
        initialize: function() {
        }, 

        render: function() {
            return this;
        }
    });
    return TweetsView;
});

