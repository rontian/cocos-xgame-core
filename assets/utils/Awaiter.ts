/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-17
*************************************************/

import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';
import { ICancellation } from '../interfaces/ICancellation';
import { IDisposable } from '../interfaces/IDisposable';
import { PoolObject } from '../pool/PoolObject';
import { Scheduler } from '../scheduler/Scheduler';
import { SchedulerManager } from '../scheduler/SchedulerManager';
import { Time } from '../scheduler/Time';
import { Signal0 } from '../signals/Signal0';
import { Deferred } from './Deferred';

export enum AwaitType {
    Frame = 1,
    Milliseconds,
    Seconds,
    WaitUntil,
}
@clazz('Awaiter')
export class Awaiter extends XObject implements IDisposable {
    public static FPS = 60;

    protected timer = 0;

    protected handler: () => boolean;

    protected type: AwaitType;

    private callback_complete = new Signal0();

    private scheduler: ICancellation;

    public onComplete(): Signal0 {
        this.callback_complete.removeAll();
        return this.callback_complete;
    }

    public setAwaiter(timeOrHandler: any, type: AwaitType = AwaitType.Frame): void {
        this.type = type;
        if (AwaitType.WaitUntil == type) {
            this.handler = timeOrHandler;
        } else {
            const time: number = timeOrHandler;
            if (type == AwaitType.Frame) {
                this.timer = timeOrHandler * (1000 / Awaiter.FPS);
            } else if (type == AwaitType.Seconds) {
                this.timer = timeOrHandler * 1000;
            } else {
                this.timer = timeOrHandler;
            }
        }
    }

    private deferred = new Deferred<void>();

    public async await(): Promise<void> {
        this.deferred = new Deferred<void>();
        this.scheduler = SchedulerManager.Instance().registerUpdate(this.advanceTime, this);
        return this.deferred.promise;
    }

    public advanceTime(): void {
        if (this.type == AwaitType.WaitUntil) {
            if (this.handler()) {
                if (this.deferred) {
                    this.deferred.resolve();
                }
                this.callback_complete.dispatch();
                this.deferred = undefined;
                this.dispose();
            }
        } else {
            this.timer -= Time.Instance().deltaTime;
            if (this.timer <= 0) {
                if (this.deferred) {
                    this.deferred.resolve();
                }
                this.callback_complete.dispatch();
                this.deferred = undefined;
                this.dispose();
            }
        }
    }

    public dispose(): void {
        if (this.scheduler) {
            SchedulerManager.Instance().removeUpdate(this.scheduler);
            this.scheduler = undefined;
        }
        this.deferred = undefined;
        this.callback_complete.removeAll();
        pools.recycle(this);
    }
}
const pools = new PoolObject<Awaiter>(Awaiter);
export async function waitEndFrames(frame = 0, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
    const awaiter = pools.fetch(() => {
        return new Awaiter();
    });
    awaiter.setAwaiter(frame, AwaitType.Frame);
    if (payload) {
        payload.apply(thisObject, [awaiter]);
    }
    return awaiter.await();
}
export async function waitMilliseconds(milliseconds: number, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
    const awaiter = pools.fetch(() => {
        return new Awaiter();
    });
    if (payload) {
        payload.apply(thisObject, [awaiter]);
    }
    awaiter.setAwaiter(milliseconds, AwaitType.Milliseconds);
    return awaiter.await();
}
export async function waitSeconds(seconds: number, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
    const awaiter = pools.fetch(() => {
        return new Awaiter();
    });
    awaiter.setAwaiter(seconds, AwaitType.Seconds);
    if (payload) {
        payload.apply(thisObject, [awaiter]);
    }
    return awaiter.await();
}
export async function waitUntil(handler: () => boolean, payload?: (awaiter: Awaiter) => void, thisObject?: any): Promise<void> {
    const awaiter = pools.fetch(() => {
        return new Awaiter();
    });
    awaiter.setAwaiter(handler, AwaitType.WaitUntil);
    if (payload) {
        payload.apply(thisObject, [awaiter]);
    }
    return awaiter.await();
}
