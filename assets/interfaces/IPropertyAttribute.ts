/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { IAttribute } from './IAttribute';

export const IPropertyAttribute = Symbol.for('IPropertyAttribute');
export interface IPropertyAttribute extends IAttribute {
    identity: symbol;
    named?: string;
    key?: string;
}
