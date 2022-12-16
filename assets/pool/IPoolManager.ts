/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { TClass } from '../types/TClass';
import { IPoolable } from './IPoolable';
import { PoolGroup } from './PoolGroup';
import { PoolObject } from './PoolObject';

export const IPoolManager = Symbol.for('IPoolManager');
export interface IPoolManager {
    debug(includeGroups?: boolean): void;
    getPool<T extends IPoolable>(Clazz: TClass<T>, initCount?: number): PoolObject<T>;
    fetch<T extends IPoolable>(Clazz: TClass<T>, newInstance?: (...args: any[]) => T, thisObject?: any, ...args: any[]): T;
    recycle<T extends IPoolable>(Clazz: TClass<T>, o: T): void;
    release<T extends IPoolable>(Clazz: TClass<T>, loop?: (value: T) => void, thisObject?: any): void;
    getPoolGroup<T extends IPoolable>(group: string): PoolGroup<T>;
}
