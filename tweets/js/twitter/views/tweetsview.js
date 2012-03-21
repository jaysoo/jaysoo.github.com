define([
        'jquery', 
        'underscore', 
        'backbone',
        'handlebars',
        '../models/tweet',
        '../collections/tweets',
        'text!templates/tweets.html'
    ], function($, _, Backbone, Handlebars, Tweet, Tweets, textTemplate){
    var TweetsView = Backbone.View.extend({

        tagName: 'ul',

        className: 'tweets container-fluid',

        template: Handlebars.compile(textTemplate),

        initialize: function() {
            _.bindAll(this, 'render', 'addTweet');
            this.collection.bind('reset', this.render);
            this.collection.bind('add', this.addTweet);
        }, 

        render: function() {
            $(this.el).empty();
            return this;
        },

        addTweet: function(tweet) {
            $(this.el).prepend( this.template({
                tweets: [tweet.toJSON()]
            }) );
        }
    });
    return TweetsView;
});

