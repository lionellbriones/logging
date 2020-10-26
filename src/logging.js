import {
    blue,
    yellow,
    red,
    gray
} from 'chalk';
import nicelyFormat from 'nicely-format';
import createDebug from 'debug';

const time = () => {
    return new Date(Date.now()).toString().slice(0, 33);
};

const indentText = (text) => text.replace(/^(?!\s+$)/mg, ' '.repeat(13)).trim();

const logger = ({
                    title,
                    messages,
                    logFunction,
                    key
                }) => {
    const formattedMessages = messages.map((message) => {
        if (typeof message === 'string') {
            return message;
        }
        return nicelyFormat(message, {
            highlight: true,
            min: true,
            theme: {
                tag: 'cyan',
                content: 'reset',
                prop: 'yellow',
                value: 'green',
                number: 'green',
                string: 'reset',
                date: 'green',
                symbol: 'red',
                regex: 'red',
                function: 'blue',
                error: 'red',
                boolean: 'yellow',
                label: 'blue',
                bracket: 'grey',
                comma: 'grey',
                misc: 'grey',
                key: 'cyan'
            }
        });
    }).map(indentText);
    logFunction[key](gray(time()), `[${title}]`, ...formattedMessages);
};

const createLogger = (title,
                      {
                          debugFunction = createDebug(title),
                          logFunction = console
                      } = {}) => {
    return {
        debug(...messages) {
            logger({
                title: yellow(`DEBUG ${title}`),
                messages,
                logFunction: debugFunction,
                key: 'debug'
            });
        },
        info(...messages) {
            logger({
                title: blue(title),
                messages,
                logFunction,
                key: 'info'
            });
        },
        warn(...messages) {
            logger({
                title: yellow(`WARNING ${title}`),
                messages,
                logFunction,
                key: 'warn'
            });
        },
        error(...messages) {
            logger({
                title: red(`ERROR ${title}`),
                messages,
                logFunction,
                key: 'error'
            });
        },
        fatal(...messages) {
            logger({
                title: red(`========= FATAL ${title} =========`),
                messages,
                logFunction,
                key: 'error'
            });
        },
        trace(...messages) {
            logger({
                title: red(`TRACE ${title}`),
                messages,
                logFunction,
                key: 'trace'
            });
        }

    };
};

export default createLogger;

