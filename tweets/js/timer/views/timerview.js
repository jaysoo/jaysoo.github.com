define([
        'jquery',
        'underscore',
        'backbone',
        '../models/timer'
    ], function($, _, Backbone, Timer) {


    var TimerView = Backbone.View.extend({
        tagName: 'p',

        className: 'timer',

        initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('all', this.render);
        },

        render: function() {
            this.$('time').html(this.model.get('time'));
        }
    });
    return TimerView;
});

