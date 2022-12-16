/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/
export function clazz(className: string) {
    return function (target: any) {
        const prototype = target.prototype ? target.prototype : Object.getPrototypeOf(target);
        Object.defineProperty(prototype, '__class__', {
            value: className,
            enumerable: false,
            writable: false,
        });
        Object.defineProperty(prototype, '__classname__', {
            value: className,
            enumerable: false,
            writable: false,
        });
    };
}
