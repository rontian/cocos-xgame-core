/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { IXObject } from '../interfaces/IXObject';
import { Event } from './Event';
import { EventListener } from './EventListener';

export const IEventManager = Symbol.for('IEventManager');

export interface IEventManager extends IXObject {
    addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
    addEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
    once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
    once(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): EventListener;
    removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
    removeEventListener(moduleId: number, type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void;
    hasEventListener(type: string): boolean;
    hasEventListener(moduleId: number, type: string): boolean;
    dispatchEvent(event: Event): boolean;
    dispatchEvent(event: string, data?: any): boolean;
    dispatchEvent(moduleId: number, event: Event): boolean;
    dispatchEvent(moduleId: number, event: string, data?: any): boolean;
}
