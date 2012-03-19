// Underscore.js mixin functions
_.mixin({
    // Creates a namespace (if needed) and return its module.
    module: function (ns) {
      var ns = ns.split('.'), 
        p = window,
        i, k;
      for(i=0; i<ns.length; i++) 
        p = p[ns[i]] = p[ns[i]] || {};
      return p;
    }                    
});

(function(Demo, Twitter) {
    Demo.AppView = Backbone.View.extend({
        // The query criteria for tweets
        query: null,

        initialize: function(options) {
            // Defaults to empty options
            options = options || {};

            if (options.query
        },

        render: function() {
            return this;
        },

        // Pulls in tweets from server
        refresh: function() {
        }
    });
})( _.module('Demo'), _.module('Demo.twitter') );
