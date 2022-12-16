/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
export function getPrototype(target: any): any {
    const type = typeof target;
    if (!target || (type != 'object' && !target.prototype)) {
        return undefined;
    }
    const prototype: any = target.prototype ? target.prototype : Object.getPrototypeOf(target);
    return prototype;
}
export function getPrototypeChains(target: any): any[] {
    const chains: any[] = [];
    let parent = target;
    while (parent) {
        chains.push(parent);
        parent = getPrototype(parent);
    }
    return chains;
}
