/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/

import { getQualifiedClassName } from './getQualifiedClassName';
import { getTypes } from './getTypes';
import { isFacade } from './isFacade';

export function is(instance: any, value: symbol): boolean;
export function is(instance: any, value: string): boolean;
export function is(instance: any, value: any): boolean {
    if (!instance || typeof instance != 'object') {
        return false;
    }
    const type = typeof value;
    if (type == 'symbol') {
        return isFacade(instance, value);
    } else if (type == 'string') {
        return _is(instance, value);
    } else {
        return _is(instance, getQualifiedClassName(value));
    }
}
function _is(instance: any, typeName: string): boolean {
    const types = getTypes(instance);
    if (!types) {
        return false;
    }
    return types.indexOf(typeName) !== -1;
}
