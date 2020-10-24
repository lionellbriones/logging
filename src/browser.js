// super basic browser support just to avoid breaking universal builds.
// title and log level are not included in the output at this time.
function createLogger(/* title */) {
    function logger(key) {
        console[key].apply(console, arguments);
    }
    return {
        info: logger("info"),
        warn: logger("warn"),
        error: logger("error"),
        debug: logger("debug")
    };
}

export default createLogger;
