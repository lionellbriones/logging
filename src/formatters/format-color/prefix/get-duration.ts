import * as timeSpan from 'time-span';
import * as parseMS from 'parse-ms';
import chalk from 'chalk';
import {logConfig} from '../../../config';
import {rightJustify} from '../helpers';

let lastCall = timeSpan();

export const getDuration = (level: Level, startTimeSpan: timeSpan.TimeSpanObject = lastCall) => {
    const ms = startTimeSpan();
    const {days, hours, minutes, seconds, milliseconds} = parseMS(ms);
    const daysHoursMinutesAsMinutes = hours * 60 + (days * 24 * 60) + minutes;
    const duration = daysHoursMinutesAsMinutes > 0
        ? `${daysHoursMinutesAsMinutes} min`
        : `${seconds > 0 ? `${seconds}s` : ''}${logConfig.isDebug ? `${milliseconds < 10 ? ' ' : ''}${milliseconds < 100 ? ' ' : ''}${Math.round(milliseconds)}ms` : ''}`;
    lastCall = timeSpan();
    const durationString = ms < (logConfig.isDebug ? 100 : 1000) ? '·' : duration;
    const annotation = level === 'DEBUG'
            ? 'DEBUG'
            : '';
    return chalk`{bgMagenta.white ${annotation}}{gray ${rightJustify(durationString, logConfig.indent - 1 - annotation.length)} }`;
};