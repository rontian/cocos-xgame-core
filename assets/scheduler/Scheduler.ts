/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { Time } from './Time';
import { ICancellation } from '../interfaces/ICancellation';
import { SchedulerManager } from './SchedulerManager';
import { SchedulerType } from './SchedulerType';
enum TimerMode {
    None = 0,
    Limit,
    Times,
}
@facade(ICancellation)
@clazz('Scheduler')
export class Scheduler extends XObject implements ICancellation {
    private timeout = 0;

    private timer = 0;

    private times = 0;

    private mode: TimerMode = TimerMode.None;

    public schedulerType: SchedulerType;

    public constructor(private manager: SchedulerManager, private action: () => void, private thisObject?: any, public order: number = 0) {
        super();
    }

    public cancel(): void {
        this.manager.$remove(this.schedulerType, this.hashCode);
    }

    public setTimeout(timeout: number, times = 0): void {
        this.timeout = timeout;
        this.timer = timeout;
        if (times > 0) {
            this.mode = TimerMode.Times;
            this.times = times;
        } else {
            this.mode = TimerMode.Limit;
            this.times = 0;
        }
    }

    public execute(): void {
        if (this.mode == TimerMode.None) {
            if (this.action) {
                this.action.apply(this.thisObject);
            }
        } else {
            this.timer -= Time.Instance().deltaTime;
            if (this.timer <= 0) {
                if (this.action) {
                    this.action.apply(this.thisObject);
                }
                this.timer += this.timeout;
                if (this.mode == TimerMode.Times) {
                    this.times--;
                    if (this.times <= 0) {
                        this.unregister();
                    }
                }
            }
        }
    }

    public unregister(): void {
        this.manager.removeUpdate(this.hashCode);
    }

    public dispose(): void {
        this.action = undefined;
        this.thisObject = undefined;
    }
}
