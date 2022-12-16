/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
export function facade(...args: symbol[]) {
    return function (target: any) {
        const prototype = target.prototype ? target.prototype : Object.getPrototypeOf(target);
        Object.defineProperty(prototype, '__implements__', {
            value: args,
            enumerable: false,
            writable: false,
        });
    };
}
