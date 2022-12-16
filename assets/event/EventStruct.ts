/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-12-14
*************************************************/

import { IDisposableGroup } from '../interfaces/IDisposableGroup';

export interface IEventObserve {
    eventName?: string;
    moduleId?: number;
    once?: boolean;
    priority?: number;
    callback?: Function;
    thisObject?: any;
}
export interface IEventSubject {
    addEventObserves(): void;
    removeEventObserves(): void;
}
