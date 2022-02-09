define('testbridge', ['require'], function(require) {
    var n = {
        ready: function() {
            try {
                window.TestBridge = n,
                parent.USING_SELENIUM && function() {
                    window.consoleOverride = !0;
                    var n = window.console.log;
                    window.console.log = function() {
                        for (var o = [], e = 0; e < arguments.length; e++)
                            o.push(arguments[e]);
                        n.apply(window.console, [].concat([o.join(" ")], o))
                    }
                }()
            } catch (n) {}
        }
    };
    return n
});