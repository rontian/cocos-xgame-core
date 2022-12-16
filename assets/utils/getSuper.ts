/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-12-15
*************************************************/

export function getSuper(constructor: Function): Function {
    const proto = constructor.prototype;
    const dunderProto = proto && Object.getPrototypeOf(proto);
    return dunderProto && dunderProto.constructor;
}
