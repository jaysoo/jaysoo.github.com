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
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render);
        }, 

        render: function() {
            $(this.el).html( this.template({
                tweets: this.collection.toJSON()
            }) );
            return this;
        }
    });
    return TweetsView;
});

