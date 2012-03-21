define([
        'jquery',
        'underscore', 
        'backbone',
        'handlebars',
        'synapse',
        'synapse/hooks/object',
        'synapse/hooks/jquery',
        'synapse/hooks/backbone-model',
        'twitter/models/searcher',
    ], function($, _, Backbone, Handlebars, Synapse, ObjectHook, jQueryHook, BackboneModelHook, 
        Searcher) {

    Synapse.addHooks(jQueryHook, BackboneModelHook, ObjectHook);

    // Search view that binds the input box value with 
    // the Searcher model's query attribute.
    var SearcherView = Backbone.View.extend({
        events: {
            'click .close': 'clearSearch'
        },

        initialize: function() {
            this.$queryInput = this.$('[name=query]');

            // Data-binding between model and element
            var data = Synapse(this.model),
                query = Synapse(this.$queryInput);
            data.observe(query);
            query.observe(data);

            // Auto-focus on search box
            this.$queryInput.focus();
        },

        clearSearch: function() {
            this.model.set({ query: '' });
            this.$queryInput.focus();
        }
    });

    return SearcherView;
});

