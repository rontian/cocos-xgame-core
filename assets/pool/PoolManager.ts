/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { TClass } from '../types/TClass';
import { Dictionary } from '../utils/Dictionary';
import { Singleton } from '../utils/Singleton';
import { IPoolable } from './IPoolable';
import { IPoolManager } from './IPoolManager';
import { PoolGroup } from './PoolGroup';
import { PoolObject } from './PoolObject';

@clazz('PoolManager')
@facade(IPoolManager)
export class PoolManager extends Singleton implements PoolManager {
    private object_pools = new Dictionary<any, PoolObject<any>>();

    private group_pools = new Dictionary<string, PoolGroup<any>>();

    public debug(includeGroups?: boolean): void {
        this.object_pools.forValues((v) => {
            console.log(v.toString());
        }, this);
        if (includeGroups) {
            this.group_pools.forValues((v) => {
                v.pools.forValues((vv) => {
                    console.log(vv.toString());
                }, this);
            }, this);
        }
    }

    public getPool<T extends IPoolable>(Clazz: TClass<T>, initCount = 0): PoolObject<T> {
        if (this.object_pools.containsKey(Clazz)) {
            return this.object_pools.get(Clazz);
        }
        const pool = new PoolObject<T>(Clazz, initCount);
        this.object_pools.add(Clazz, pool);
        return pool;
    }

    public fetch<T extends IPoolable>(Clazz: TClass<T>, newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T {
        const pool = this.getPool<T>(Clazz);
        return <T>pool.fetch(newInstance, thisObject, ...args);
    }

    public recycle<T extends IPoolable>(Clazz: TClass<T>, o: T): void {
        const pool = this.getPool<T>(Clazz);
        pool.recycle(o);
    }

    public release<T extends IPoolable>(Clazz: TClass<T>, loop?: (value: T) => void, thisObject?: any): void {
        const pool = this.getPool<T>(Clazz);
        pool.release(loop, thisObject);
    }

    public getPoolGroup<T extends IPoolable>(group: string): PoolGroup<T> {
        let poolGroup = this.group_pools.get(group);
        if (poolGroup == null) {
            poolGroup = new PoolGroup<T>(group);
            this.group_pools.add(group, poolGroup);
        } else {
            poolGroup = this.group_pools.get(group);
        }
        return poolGroup;
    }
}
