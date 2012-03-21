define([
        'underscore',
        'backbone'
    ], function(_, Backbone) {
    var Timer = Backbone.Model.extend({
        defaults: {
            started: false,
            max: 10,
            time: 0
        },

        // For setInterval
        t: null,
        
        initialize: function() {
            _.bindAll(this, 'countDown');
            // Max out time left
            this.set({ time: this.get('max') });
        },

        start: function() {
            if (!this.get('started')) {
                this.t = setInterval(this.countDown, 1000);
                this.set({ started: true });
            }
        },

        stop: function() {
            clearInterval(this.t);
            this.set({ started: false });
        },

        resetTime: function() {
            this.set({ time: this.get('max') });
        },

        countDown: function() {
            var prevTime = this.get('time');
            this.set({ time: prevTime - 1 });
            if (this.get('time') === 0) {
                this.trigger('alarm');
                this.set({ time: this.get('max') });
            }
        }
    });
    return Timer;
});
