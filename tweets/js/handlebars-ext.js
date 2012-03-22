define([
        'handlebars',
        'moment'
    ], function(Handlebars, moment) {
    Handlebars.registerHelper('naturalday', function(dateStr, format) {
        try {
            format = format || 'MMM dd, yyyy';
            return moment(new Date(dateStr)).fromNow();
        } catch (e) {
            return dateStr;
        }
    });
});
