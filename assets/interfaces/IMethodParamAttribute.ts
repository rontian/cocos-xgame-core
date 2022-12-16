/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { IAttribute } from './IAttribute';

export const IMethodParamAttribute = Symbol.for('IMethodParamAttribute');
export interface IMethodParamAttribute extends IAttribute {
    identity: symbol;
    named?: string;
    key: string;
    index: number;
}
