define([
        'jquery', 
        'underscore', 
        'backbone',
        '../models/tweet'
    ], function($, _, Backbone, Tweet){
    var TweetView = Backbone.View.extend({
        initialize: function() {
        }, 

        render: function() {
            return this;
        }
    });
    return TweetView;
});

