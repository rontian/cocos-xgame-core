/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { XObject } from '../core/XObject';
import { Event } from './Event';

export const IEventDispatcher = Symbol.for('IEventDispatcher');
export interface IEventDispatcher extends XObject {
    addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
    hasEventListener(type: string): boolean;
    dispatchEvent(event: Event): boolean;
    willTrigger(type: string): boolean;
}
