/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

import { Timeline } from '../core/Timeline';

export const ITimelineManager = Symbol.for('ITimelineManager');
export interface ITimelineManager {
    getOrCreateTimeline(name?: string): Timeline;
}
