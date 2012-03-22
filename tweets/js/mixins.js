define([], function() {
    var Mixins = {};
    Mixins.Buffer = {
        bufferQueue: [],

        buffer: function(fn, options) {
            options = options || {};
            // Adds a command to the buffer, and executes it if it's
            // the only command to be ran.
            var that = this;
            if (options.shift)
                that.bufferQueue.unshift(fn);
            else 
                that.bufferQueue.push(fn);
            if (that.bufferQueue.length == 1) fn(next);

            // Moves onto the next command in the buffer.
            function next() {
                that.bufferQueue.shift();
                if (that.bufferQueue.length) that.bufferQueue[0](next);
            }
        },

        clearBuffer: function() {
            this.bufferQueue = [];
        }
    };
    return Mixins;
});
