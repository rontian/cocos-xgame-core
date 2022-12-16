/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-12-15
*************************************************/

export function setPropertyDescriptor(target: any, key: PropertyKey, describe: PropertyDescriptor): void {
    Object.defineProperty(target, key, describe);
}
