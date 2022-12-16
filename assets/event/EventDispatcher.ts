/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { DisposableGroup } from '../core/DisposableGroup';
import { ServiceContainer } from '../core/ServiceContainer';
import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { IDisposableGroup } from '../interfaces/IDisposableGroup';
import { Event } from './Event';
import { IEventAttribute } from './IEventAttribute';
import { IEventDispatcher } from './IEventDispatcher';

const enum Keys {
    eventTarget,
    eventsMap,
    captureEventsMap,
    notifyLevel,
}

interface IEventBin {
    type: string;
    listener: (e?: Event) => void;
    thisObject: any;
    priority: number;
    target: IEventDispatcher;
    useCapture: boolean;
    dispatchOnce: boolean;
}

const ONCE_EVENT_LIST: IEventBin[] = [];

@facade(IEventDispatcher)
@clazz('EventDispatcher')
export class EventDispatcher extends XObject implements IEventDispatcher {
    public constructor(target: IEventDispatcher = null) {
        super();
        this.$EventDispatcher = {
            0: target ? target : this,
            1: {},
            2: {},
            3: 0,
        };
    }

    $EventDispatcher: { [key: string]: any };

    $getEventMap(useCapture?: boolean) {
        const values = this.$EventDispatcher;
        const eventMap: any = useCapture ? values[Keys.captureEventsMap] : values[Keys.eventsMap];
        return eventMap;
    }

    public addEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void {
        this.$addListener(type, listener, thisObject, useCapture, priority);
    }

    public once(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void {
        this.$addListener(type, listener, thisObject, useCapture, priority, true);
    }

    $addListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void {
        const values = this.$EventDispatcher;
        const eventMap: any = useCapture ? values[Keys.captureEventsMap] : values[Keys.eventsMap];
        let list: IEventBin[] = eventMap[type];
        if (!list) {
            list = eventMap[type] = [];
        } else if (values[Keys.notifyLevel] !== 0) {
            eventMap[type] = list = list.concat();
        }

        this.$insertEventBin(list, type, listener, thisObject, useCapture, priority, dispatchOnce);
    }

    $insertEventBin(list: any[], type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): boolean {
        priority = +priority | 0;
        let insertIndex = -1;
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const bin = list[i];
            if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
                return false;
            }
            if (insertIndex == -1 && bin.priority < priority) {
                insertIndex = i;
            }
        }
        const eventBin: IEventBin = {
            type: type,
            listener: listener,
            thisObject: thisObject,
            priority: priority,
            target: this,
            useCapture: useCapture,
            dispatchOnce: !!dispatchOnce,
        };
        if (insertIndex !== -1) {
            list.splice(insertIndex, 0, eventBin);
        } else {
            list.push(eventBin);
        }
        return true;
    }

    public removeEventListener(type: string, listener: (e?: Event) => void, thisObject: any, useCapture?: boolean): void {
        const values = this.$EventDispatcher;
        const eventMap: { [key: string]: IEventBin[] } = useCapture ? values[Keys.captureEventsMap] : values[Keys.eventsMap];
        let list: IEventBin[] = eventMap[type];
        if (!list) {
            return;
        }
        if (values[Keys.notifyLevel] !== 0) {
            eventMap[type] = list = list.concat();
        }

        this.$removeEventBin(list, listener, thisObject);

        if (list.length == 0) {
            eventMap[type] = null;
        }
    }

    $removeEventBin(list: any[], listener: (e?: Event) => void, thisObject: any): boolean {
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const bin = list[i];
            if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
                list.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    public hasEventListener(type: string): boolean {
        const values = this.$EventDispatcher;
        return !!(values[Keys.eventsMap][type] || values[Keys.captureEventsMap][type]);
    }

    public willTrigger(type: string): boolean {
        return this.hasEventListener(type);
    }

    public dispatchEvent(event: Event): boolean {
        event.$currentTarget = this.$EventDispatcher[Keys.eventTarget];
        event.$setTarget(event.$currentTarget);
        return this.$notifyListener(event, false);
    }

    $notifyListener(event: Event, capturePhase: boolean): boolean {
        const values = this.$EventDispatcher;
        const eventMap: { [key: string]: IEventBin[] } = capturePhase ? values[Keys.captureEventsMap] : values[Keys.eventsMap];
        const list: IEventBin[] = eventMap[event.$type];
        if (!list) {
            return true;
        }
        const length = list.length;
        if (length == 0) {
            return true;
        }
        const onceList = ONCE_EVENT_LIST;
        //做个标记，防止外部修改原始数组导致遍历错误。这里不直接调用list.concat()因为dispatch()方法调用通常比on()等方法频繁。
        values[Keys.notifyLevel]++;
        for (let i = 0; i < length; i++) {
            const eventBin = list[i];
            eventBin.listener.call(eventBin.thisObject, event);
            if (eventBin.dispatchOnce) {
                onceList.push(eventBin);
            }
            if (event.$isPropagationImmediateStopped) {
                break;
            }
        }
        values[Keys.notifyLevel]--;
        while (onceList.length) {
            const eventBin = onceList.pop();
            eventBin.target.removeEventListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);
        }
        return !event.$isDefaultPrevented;
    }

    public dispatchEventWith(type: string, bubbles?: boolean, data?: any, cancelable?: boolean): boolean {
        if (bubbles || this.hasEventListener(type)) {
            const event: Event = Event.create(Event, type, bubbles, cancelable);
            event.data = data;
            const result = this.dispatchEvent(event);
            Event.release(event);
            return result;
        }
        return true;
    }

    //================================================
    // IEventSubject
    //================================================
    private eventDisposableGroup: IDisposableGroup;

    private isEventObserveParsed = false;

    public addEventObserves(): void {
        if (!this.isEventObserveParsed) {
            this.isEventObserveParsed = true;
            this.eventDisposableGroup = new DisposableGroup();
            const eventObserves = ServiceContainer.Instance().getAttributes<IEventAttribute>(this, IEventAttribute);
            if (eventObserves.length) {
                for (const observe of eventObserves) {
                    this.eventDisposableGroup.addEventListener(observe.moduleId, observe.eventName, <any>observe.invoke, this, false, observe.priority);
                }
            }
        }
    }

    public removeEventObserves(): void {
        this.eventDisposableGroup?.dispose();
    }
}
