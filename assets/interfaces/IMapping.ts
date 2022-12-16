/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

export const IMapping = Symbol.for('IMapping');
export interface IMapping {
    setAlias(identity: symbol): IMapping;
    withInstance(instance: any, named?: string): IMapping;
}
