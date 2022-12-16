/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { SchedulerManager } from '../scheduler/SchedulerManager';
import { Time } from '../scheduler/Time';
import { Dictionary } from '../utils/Dictionary';
import { Singleton } from '../utils/Singleton';
import { Timeline } from './core/Timeline';
import { ITimelineManager } from './interfaces/ITimelineManager';
import { ITimelineManagerInternal } from './interfaces/ITimelineManagerInternal';

/**
 * 时间轴管理器
 */
@facade(ITimelineManager, ITimelineManagerInternal)
@clazz('TimelineManager')
export class TimelineManager extends Singleton implements ITimelineManager, ITimelineManagerInternal {
    public constructor() {
        super();
    }

    public initialize(): void {
        SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
    }

    protected advanceTime(): void {
        const deltaTime = Time.Instance().deltaTime;
        this.timelines.forValues((timeline) => {
            timeline.advanceTime(deltaTime);
        }, this);
    }

    private timelines = new Dictionary<string, Timeline>();

    public getOrCreateTimeline(name: string = Timeline.MAIN): Timeline {
        if (!this.timelines.containsKey(name)) {
            this.timelines.add(name, new Timeline(name));
        }
        return this.timelines.get(name);
    }
}
