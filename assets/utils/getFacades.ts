/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/

import { getPrototype } from './getPrototype';

export function getFacades(target: any): symbol[] {
    const types: symbol[] = [];
    let prototype = getPrototype(target);
    while (prototype) {
        const list: symbol[] = prototype.__implements__;
        if (list && list.length) {
            for (const type of list) {
                if (types.indexOf(type) == -1) {
                    types.push(type);
                }
            }
        }
        prototype = getPrototype(prototype);
    }
    return types;
}
