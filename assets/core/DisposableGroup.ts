/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { facade } from '../decorators/facade';
import { EventManager } from '../event/EventManager';
import { EventListener } from '../event/EventListener';
import { IDisposable } from '../interfaces/IDisposable';
import { IDisposableGroup } from '../interfaces/IDisposableGroup';
import { Locker } from './Locker';
import { SchedulerManager } from '../scheduler/SchedulerManager';
import { clazz } from '../decorators/clazz';
@facade(IDisposable, IDisposableGroup)
@clazz('DisposableGroup')
export class DisposableGroup extends Locker implements IDisposable, IDisposableGroup {
    public readonly registeredDisposables: IDisposable[] = [];

    public constructor() {
        super();
    }

    public dispose(): void {
        this.simple(() => {
            while (this.registeredDisposables.length) {
                const o = this.registeredDisposables.shift();
                o.dispose();
            }
        }, this);
    }

    public register(o: IDisposable, invokeDisposeOnceIfExist = false): DisposableGroup {
        this.simple(() => {
            const indexOf: number = this.registeredDisposables.indexOf(o);
            if (indexOf >= 0) {
                if (invokeDisposeOnceIfExist) {
                    o.dispose();
                }
            } else {
                this.registeredDisposables.push(o);
            }
        }, this);
        return this;
    }

    public addEventListener(...args: any[]): void {
        const self: DisposableGroup = this;
        const manager = EventManager.Instance();
        const addEventListener: Function = manager.addEventListener;
        const listener: EventListener = addEventListener.apply(manager, args);
        self.register(listener);
    }

    public once(...args: any[]): void {
        const self: DisposableGroup = this;
        const manager = EventManager.Instance();
        const once: Function = manager.once;
        const listener: EventListener = once.apply(manager, args);
        self.register(listener);
    }

    public registerPreUpdate(action: () => void, thisObject?: any, order?: number): void {
        const self: DisposableGroup = this;
        const manager = SchedulerManager.Instance();
        const scheduler = manager.registerPreUpdate(action, thisObject, order);
        self.register(scheduler);
    }

    public registerUpdate(action: () => void, thisObject?: any, order?: number): void {
        const self: DisposableGroup = this;
        const manager = SchedulerManager.Instance();
        const scheduler = manager.registerUpdate(action, thisObject, order);
        self.register(scheduler);
    }

    public registerPostUpdate(action: () => void, thisObject?: any, order?: number): void {
        const self: DisposableGroup = this;
        const manager = SchedulerManager.Instance();
        const scheduler = manager.registerPostUpdate(action, thisObject, order);
        self.register(scheduler);
    }

    public registerTimer(timeout: number, action: () => void, thisObject?: any, times?: number, order?: number): void {
        const self: DisposableGroup = this;
        const manager = SchedulerManager.Instance();
        const scheduler = manager.registerTimer(timeout, action, thisObject, times, order);
        self.register(scheduler);
    }
}
