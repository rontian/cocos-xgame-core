/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';
import { TClass } from '../types/TClass';
import { getQualifiedClassName } from '../utils/getQualifiedClassName';
import { IPoolable } from './IPoolable';

interface IDebugInfo {
    create?: number;
    count?: number;
    ClassType?: string;
    group?: string;
    key?: string;
}
function get_timestamp(): number {
    return Math.floor(new Date().valueOf() / 1000);
}
@clazz('PoolObject')
export class PoolObject<T extends IPoolable> extends XObject {
    private instances: T[] = [];

    private $timestamp = 0;

    public get timestamp(): number {
        return this.$timestamp;
    }

    private $create = 0;

    public get create(): number {
        return this.$create;
    }

    public get count(): number {
        return this.instances.length;
    }

    public get fulled(): boolean {
        return this.create > 0 && this.create == this.count;
    }

    private Clazz: TClass<T>;

    public group = '';

    public key: string | number = '';

    public constructor(Clazz: TClass<T>, count_init = 0) {
        super();
        this.$timestamp = get_timestamp();
        this.Clazz = Clazz;
        if (count_init > 0) {
            for (let i = 0; i < count_init; i++) {
                this.instances.push(new Clazz());
            }
        }
    }

    public toString(): string {
        const info = <IDebugInfo>{ create: this.create, count: this.count, group: this.group, key: this.key, ClassType: getQualifiedClassName(this.Clazz) };
        return JSON.stringify(info);
    }

    public fetch(newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T {
        if (this.count > 0) {
            return this.instances.shift();
        }
        let instance: T;
        if (newInstance) {
            instance = newInstance.apply(thisObject, args);
        } else {
            instance = new this.Clazz(...args);
        }
        instance.fromPoolHashCode = this.hashCode;
        this.$create++;
        this.$timestamp = get_timestamp();
        return instance;
    }

    public ping(instance: T): void {
        instance.fromPoolHashCode = this.hashCode;
        this.$create++;
        this.$timestamp = get_timestamp();
    }

    public recycle(instance: T): void {
        if (instance.fromPoolHashCode == this.hashCode) {
            if (this.instances.indexOf(instance) == -1) {
                this.instances.push(instance);
                if (instance.dispose) {
                    instance.dispose();
                }
                this.$timestamp = get_timestamp();
            }
        }
    }

    public release(loop?: (value: T) => void, thisObject?: any): void {
        while (this.instances.length) {
            const instance = this.instances.shift();
            if (loop) {
                loop.apply(thisObject, [instance]);
            }
            if (instance.release) {
                instance.release();
            }
        }
        this.$timestamp = get_timestamp();
    }
}
