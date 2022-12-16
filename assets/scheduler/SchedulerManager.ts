/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { __lockobject__ } from '../core/Locker';
import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { List } from '../linq/List';
import { Singleton } from '../utils/Singleton';
import { ISchedulerManager } from './ISchedulerManager';
import { Scheduler } from './Scheduler';
import { Time } from './Time';
import { SchedulerType } from './SchedulerType';
import { ICancellation } from '../interfaces/ICancellation';

@clazz('SchedulerManager')
@facade(ISchedulerManager)
export class SchedulerManager extends Singleton implements ISchedulerManager {
    private $preUpdateItems = new Map<number, Scheduler>();

    private $preUpdateIndexes = new List<number>();

    private $updateItems = new Map<number, Scheduler>();

    private $updateIndexes = new List<number>();

    private $postUpdateItems = new Map<number, Scheduler>();

    private $postUpdateIndexes = new List<number>();

    public constructor() {
        super();
    }

    public tick(deltaTime: number): void {
        __lockobject__(this).simple(() => {
            const time = Time.Instance();
            time.deltaTime = time.timeScale * deltaTime;
            time.passedTime += time.deltaTime;
            let i = 0,
                len = 0,
                hashCode = 0;
            let scheduler: Scheduler;
            //preupdate
            len = this.$preUpdateIndexes.count();
            for (i = 0; i < len; i++) {
                hashCode = this.$preUpdateIndexes.elementAt(i);
                scheduler = this.$preUpdateItems.get(hashCode);
                scheduler.execute();
            }
            //update
            len = this.$updateIndexes.count();
            for (i = 0; i < len; i++) {
                hashCode = this.$updateIndexes.elementAt(i);
                scheduler = this.$updateItems.get(hashCode);
                scheduler.execute();
            }
            //postupdate
            len = this.$postUpdateIndexes.count();
            for (i = 0; i < len; i++) {
                hashCode = this.$postUpdateIndexes.elementAt(i);
                scheduler = this.$postUpdateItems.get(hashCode);
                scheduler.execute();
            }
        }, this);
    }

    //================================================
    //preupdate
    //================================================
    public registerPreUpdate(action: () => void, thisObject?: any, order = 0): ICancellation {
        return this.$register(SchedulerType.preUpdate, action, thisObject, order);
    }

    public removePreUpdate(scheduler: ICancellation): void;

    public removePreUpdate(hashCode: number): void;

    public removePreUpdate(value: any): void {
        let hashCode: number = value;
        if (typeof value != 'number') {
            hashCode = value.hashCode;
        }
        this.$remove(SchedulerType.preUpdate, hashCode);
    }

    //================================================
    //update
    //================================================
    public registerUpdate(action: () => void, thisObject?: any, order = 0): ICancellation {
        return this.$register(SchedulerType.Update, action, thisObject, order);
    }

    public removeUpdate(scheduler: ICancellation): void;

    public removeUpdate(hashCode: number): void;

    public removeUpdate(value: any): void {
        let hashCode: number = value;
        if (typeof value != 'number') {
            hashCode = value.hashCode;
        }
        this.$remove(SchedulerType.Update, hashCode);
    }

    //================================================
    //postupdate
    //================================================
    public registerPostUpdate(action: () => void, thisObject?: any, order = 0): ICancellation {
        return this.$register(SchedulerType.postUpdate, action, thisObject, order);
    }

    public removePostUpdate(scheduler: ICancellation): void;

    public removePostUpdate(hashCode: number): void;

    public removePostUpdate(value: any): void {
        let hashCode: number = value;
        if (typeof value != 'number') {
            hashCode = value.hashCode;
        }
        this.$remove(SchedulerType.postUpdate, hashCode);
    }

    //================================================
    //timer
    //================================================
    public registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): ICancellation {
        const scheduler = this.$register(SchedulerType.Update, action, thisObject, order);
        scheduler.setTimeout(timeout, times);
        return scheduler;
    }

    public removeTimer(scheduler: ICancellation): void;

    public removeTimer(hashCode: number): void;

    public removeTimer(value: any): void {
        let hashCode: number = value;
        if (typeof value != 'number') {
            hashCode = value.hashCode;
        }
        this.$remove(SchedulerType.Update, hashCode);
    }

    //================================================
    //private
    //================================================
    private $register(schedulerType: SchedulerType, action: () => void, thisObject?: any, order = 0): Scheduler {
        const scheduler = new Scheduler(this, action, thisObject, order);
        scheduler.schedulerType = schedulerType;
        __lockobject__(this).simple(() => {
            let indexs: List<number>;
            let items: Map<number, Scheduler>;
            if (schedulerType == SchedulerType.preUpdate) {
                indexs = this.$preUpdateIndexes;
                items = this.$preUpdateItems;
            } else if (schedulerType == SchedulerType.postUpdate) {
                indexs = this.$postUpdateIndexes;
                items = this.$postUpdateItems;
            } else {
                indexs = this.$updateIndexes;
                items = this.$updateItems;
            }
            items.set(scheduler.hashCode, scheduler);
            if (!order) {
                indexs.append(scheduler.hashCode);
            } else {
                const index = this.getInsertIndex(1, order);
                indexs.insert(index, scheduler.hashCode);
            }
        }, this);
        return scheduler;
    }

    public $remove(mode: number, hashCode: number): void {
        __lockobject__(this).simple(() => {
            let indexs: List<number>;
            let items: Map<number, Scheduler>;
            if (mode == SchedulerType.preUpdate) {
                indexs = this.$preUpdateIndexes;
                items = this.$preUpdateItems;
            } else if (mode == SchedulerType.postUpdate) {
                indexs = this.$postUpdateIndexes;
                items = this.$postUpdateItems;
            } else {
                indexs = this.$updateIndexes;
                items = this.$updateItems;
            }
            if (indexs.contains(hashCode)) {
                indexs.remove(hashCode);
            }
            if (items.has(hashCode)) {
                const scheduler = items.get(hashCode);
                scheduler.dispose();
                items.delete(hashCode);
            }
        }, this);
    }

    private getInsertIndex(mode: number, order = 0): number {
        let indexs: List<number>;
        let items: Map<number, Scheduler>;
        if (mode == SchedulerType.preUpdate) {
            indexs = this.$preUpdateIndexes;
            items = this.$preUpdateItems;
        } else if (mode == SchedulerType.postUpdate) {
            indexs = this.$postUpdateIndexes;
            items = this.$postUpdateItems;
        } else {
            indexs = this.$updateIndexes;
            items = this.$updateItems;
        }
        let i = 0,
            len = 0,
            hashCode = 0;
        let scheduler: Scheduler;
        len = indexs.count();
        if (len == 0) {
            return 0;
        }
        for (i = 0; i < len; i++) {
            hashCode = indexs.elementAt(i);
            scheduler = items.get(hashCode);
            if (order > order) {
                return i;
            }
        }
        return len - 1;
    }
}
