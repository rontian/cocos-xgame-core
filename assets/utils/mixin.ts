/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/
const EXCLUDES: string[] = ['__meta__', '__class__', '__types__', '__xgame_attributes__', '__ns__', '__implements__', '__xlisteners__', '__xbindables__'];
function isEmptyFunction(prototype: any, key: string): boolean {
    if (typeof prototype[key] != 'function') {
        return false;
    }
    let body = prototype[key].toString();
    const index = body.indexOf('{');
    const lastIndex = body.lastIndexOf('}');
    body = body.substring(index + 1, lastIndex);
    return body.trim() == '';
}
export function mixin(...templates: any[]) {
    return function (target: any) {
        for (const template of templates) {
            __mixin__(target, template);
        }
    };
}
export function __mixin__(target: any, template: any): void {
    for (const property in template) {
        if (property != 'prototype' && template.hasOwnProperty(property)) {
            target[property] = template[property];
        }
    }
    const prototype = target.prototype;
    const protoBase = template.prototype;
    const keys = Object.keys(protoBase);
    const length = keys.length;
    if (length) {
        for (let i = 0; i < length; i++) {
            const key = keys[i];
            if (EXCLUDES.indexOf(key) >= 0) {
                continue;
            }
            if (!prototype.hasOwnProperty(key) || isEmptyFunction(prototype, key)) {
                const value = Object.getOwnPropertyDescriptor(protoBase, key);
                /*
                const copy = <PropertyDescriptor>{
                    configurable: false,
                    writable: false,
                    enumerable: false,
                    value: value.value,
                    set: value.set,
                    get: value.get,
                };
                */
                Object.defineProperty(prototype, key, value);
            }
        }
    } else {
        Object.assign(prototype, protoBase);
    }
}
