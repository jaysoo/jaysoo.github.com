/*
 * TimerView that will update its DOM element whenever the time changes on
 * the Timer object.
 */
define([
        'jquery',
        'underscore',
        'backbone'
    ], function($, _, Backbone) {
    var TimerView = Backbone.View.extend({
        tagName: 'p',

        className: 'timer',

        initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('all', this.render);
        },

        // Updates the text of the <time> element if it exists
        // Otherwise, update the inner HTML of this view element
        render: function() {
            var $time = this.$('time'),
                time = this.model.get('time');
            if ($time)
                $time.html(time);
            else 
                $(this.el).html(time);
        }
    });
    return TimerView;
});

