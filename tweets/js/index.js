require.config({
    paths: {
        handlebars: 'libs/handlebars/handlebars',
        jquery: 'libs/jquery/jquery-1.7.1.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone',
        localstorage: 'libs/backbone/localstorage',
        text: 'libs/require/text'
    }
});

require(['app'], function(AppView) {
    var app = new AppView();
    app.render();
    window.App = app;
});
