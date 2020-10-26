import test from 'ava';
import { spy } from 'sinon';
import mockDate from 'mockdate';
import createLogger from '../src';

const COMPLEX_OBJECT_FOR_TESTING = [ 'abc123', {
    a: 'apple',
    b: 'bear',
    c: [ 'cookies', 'cake', 'calculators', { abc: 123, def: 'jhi', klm: true, pqr: false } ]
} ];

mockDate.set('1/1/2017');

test('log debug', (t) => {
    const debugFunction = spy();
    const { debug } = createLogger('logging.test', { debugFunction });
    debug(...COMPLEX_OBJECT_FOR_TESTING);

    const logOutput = debugFunction.getCall(0).args;
    t.truthy(logOutput);

    // snapshots broken https://github.com/avajs/ava/issues/1218
    // t.snapshot(logOutput);
});

test('log info', (t) => {
    const logFunction = {
        debug: spy(),
        trace: spy(),
        info: spy(),
        log: spy(),
        error: spy(),
        warn: spy()
    };
    const { info } = createLogger('logging.test', { logFunction });
    info(...COMPLEX_OBJECT_FOR_TESTING);

    const logOutput = logFunction.info.getCall(0).args;
    t.truthy(logOutput);

    // snapshots broken https://github.com/avajs/ava/issues/1218
    // t.snapshot(logFunction.getCall(0).args);
});

test('log warning', (t) => {
    const logFunction = {
        debug: spy(),
        trace: spy(),
        info: spy(),
        log: spy(),
        error: spy(),
        warn: spy()
    };
    const { warn } = createLogger('logging.test', { logFunction });
    warn(...COMPLEX_OBJECT_FOR_TESTING);

    const logOutput = logFunction.warn.getCall(0).args;
    t.truthy(logOutput);

    // snapshots broken https://github.com/avajs/ava/issues/1218
    // t.snapshot(logFunction.getCall(0).args);
});

test('log error', (t) => {
    const logFunction = {
        debug: spy(),
        trace: spy(),
        info: spy(),
        log: spy(),
        error: spy(),
        warn: spy()
    };
    const { error } = createLogger('logging.test', { logFunction });
    error(...COMPLEX_OBJECT_FOR_TESTING);

    const logOutput = logFunction.error.getCall(0).args;
    t.truthy(logOutput);

    // snapshots broken https://github.com/avajs/ava/issues/1218
    // t.snapshot(logFunction.getCall(0).args);
});
