/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-11-11
*************************************************/
import { IDisposable } from './IDisposable';
import { Event } from '../event/Event';
export const IDisposableGroup = Symbol.for('IDisposableGroup');
export interface IDisposableGroup {
    dispose(): void;
    register(o: IDisposable, invokeDisposeOnceIfExist: boolean): IDisposableGroup;
    //event
    addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    //scheduler
    registerPreUpdate(action: () => void, thisObject?: any, order?: number): void;
    registerUpdate(action: () => void, thisObject?: any, order?: number): void;
    registerPostUpdate(action: () => void, thisObject?: any, order?: number): void;
    registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): void;
}
