/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/

import { getPrototype } from './getPrototype';
import { getQualifiedClassName } from './getQualifiedClassName';

export function getQualifiedClassChainNames(value: any): string[] {
    const names: string[] = [];
    names.push(getQualifiedClassName(value));
    let prototype = getPrototype(value);
    while (prototype) {
        const name = getQualifiedClassName(prototype);
        if (name && names.indexOf(name) == -1) {
            names.push(name);
        }
        prototype = getPrototype(prototype);
    }
    return names;
}
