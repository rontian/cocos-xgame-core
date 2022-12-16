/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { IAttribute } from './IAttribute';

export const IInjectableAttribute = Symbol.for('IInjectableAttribute');
export interface IInjectableAttribute extends IAttribute {
    injectable: boolean;
}
