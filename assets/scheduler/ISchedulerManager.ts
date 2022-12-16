/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { ICancellation } from '../interfaces/ICancellation';
import { Scheduler } from './Scheduler';

export const ISchedulerManager = Symbol.for('ISchedulerManager');
export interface ISchedulerManager {
    registerPreUpdate(action: () => void, thisObject?: any, order?: number): ICancellation;
    removePreUpdate(scheduler: ICancellation): void;
    removePreUpdate(hashCode: number): void;

    registerUpdate(action: () => void, thisObject?: any, order?: number): ICancellation;
    removeUpdate(scheduler: ICancellation): void;
    removeUpdate(hashCode: number): void;

    registerPostUpdate(action: () => void, thisObject?: any, order?: number): ICancellation;
    removePostUpdate(scheduler: ICancellation): void;
    removePostUpdate(hashCode: number): void;

    registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): ICancellation;
    removeTimer(scheduler: ICancellation): void;
    removeTimer(hashCode: number): void;
}
