/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

import { injectInstance } from './injectInstance';

export function createInstance<T>(Clazz: new (...args: any[]) => T, ...args: any[]): T {
    const instance = new Clazz(...args);
    return injectInstance(instance);
}
