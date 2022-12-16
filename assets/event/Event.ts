/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';
import { EventPhase } from './EventPhase';
import { IEventDispatcher } from './IEventDispatcher';

@clazz('Event')
export class Event extends XObject {
    public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
        super();
        this.$type = type;
        this.$bubbles = !!bubbles;
        this.$cancelable = !!cancelable;
        this.data = data;
    }

    public data: any;

    $type: string;

    public get type(): string {
        return this.$type;
    }

    $bubbles: boolean;

    public get bubbles(): boolean {
        return this.$bubbles;
    }

    $cancelable: boolean;

    public get cancelable(): boolean {
        return this.$cancelable;
    }

    $eventPhase = 2;

    public get eventPhase(): number {
        return this.$eventPhase;
    }

    $currentTarget: any = null;

    public get currentTarget(): any {
        return this.$currentTarget;
    }

    $target: any = null;

    public get target(): any {
        return this.$target;
    }

    $setTarget(target: any): boolean {
        this.$target = target;
        return true;
    }

    $isDefaultPrevented = false;

    public isDefaultPrevented(): boolean {
        return this.$isDefaultPrevented;
    }

    public preventDefault(): void {
        if (this.$cancelable) this.$isDefaultPrevented = true;
    }

    $isPropagationStopped = false;

    public stopPropagation(): void {
        if (this.$bubbles) this.$isPropagationStopped = true;
    }

    $isPropagationImmediateStopped = false;

    public stopImmediatePropagation(): void {
        if (this.$bubbles) this.$isPropagationImmediateStopped = true;
    }

    protected clean(): void {
        this.data = this.$currentTarget = null;
        this.$setTarget(null);
    }

    public static dispatchEvent(target: IEventDispatcher, type: string, bubbles = false, data?: any): boolean {
        const event = Event.create(Event, type, bubbles);
        const props: any = Event._getPropertyData(Event);
        if (data != undefined) {
            props.data = data;
        }
        const result = target.dispatchEvent(event);
        Event.release(event);
        return result;
    }

    public static _getPropertyData(EventClass: any): any {
        let props: any = EventClass._props;
        if (!props) props = EventClass._props = {};
        return props;
    }

    public static create<T extends Event>(
        EventClass: { new (type: string, bubbles?: boolean, cancelable?: boolean): T; eventPool?: Event[] },
        type: string,
        bubbles?: boolean,
        cancelable?: boolean
    ): T {
        let eventPool: Event[];
        const hasEventPool = (EventClass as any).hasOwnProperty('eventPool');
        if (hasEventPool) {
            eventPool = EventClass.eventPool;
        }

        if (!eventPool) {
            eventPool = EventClass.eventPool = [];
        }
        if (eventPool.length) {
            const event: T = <T>eventPool.pop();
            event.$type = type;
            event.$bubbles = !!bubbles;
            event.$cancelable = !!cancelable;
            event.$isDefaultPrevented = false;
            event.$isPropagationStopped = false;
            event.$isPropagationImmediateStopped = false;
            event.$eventPhase = EventPhase.AT_TARGET;
            return event;
        }
        return new EventClass(type, bubbles, cancelable);
    }

    public static release(event: Event): void {
        event.clean();
        const EventClass: any = Object.getPrototypeOf(event).constructor;
        EventClass.eventPool.push(event);
    }
}
