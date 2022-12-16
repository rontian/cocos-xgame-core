/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
import { IXObject } from './IXObject';

export const IDisposable = Symbol.for('IDisposable');
export interface IDisposable extends IXObject {
    dispose(): void;
}
