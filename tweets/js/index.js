require.config({
    paths: {
        handlebars: 'libs/handlebars/handlebars',
        jquery: 'libs/jquery/jquery-1.7.1.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone',
        localStorage: 'libs/backbone/localstorage',
        text: 'libs/require/text',
        synapse: 'libs/synapse/synapse',
        'synapse/core': 'libs/synapse/synapse',
        'synapse/hooks/object': 'libs/synapse/hooks/object',
        'synapse/hooks/jquery': 'libs/synapse/hooks/jquery',
        'synapse/hooks/backbone-model': 'libs/synapse/hooks/backbone-model',
        'synapse/hooks/backbone-view': 'libs/synapse/hooks/backbone-view'
    }
});

require([
        'app'
    ], function(app) {
    window.App = app;
});
