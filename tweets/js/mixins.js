define([], function() {
    var Mixins = {};
    Mixins.Buffer = {
        commands: [],

        buffer: function(fn) {
            // Adds a command to the buffer, and executes it if it's
            // the only command to be ran.
            var commands = this.commands;
            commands.push(fn);
            if (this.commands.length == 1) fn(next);

            // Moves onto the next command in the buffer.
            function next() {
                commands.shift();
                if (commands.length) commands[0](next);
            }
        }
    };
    return Mixins;
});
