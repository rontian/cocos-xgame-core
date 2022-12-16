/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-12-15
*************************************************/

export function isObject(target: any): boolean {
    return typeof target === 'object' ? target !== null : typeof target === 'function';
}
