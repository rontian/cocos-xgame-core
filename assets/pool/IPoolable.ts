/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { IDisposable } from '../interfaces/IDisposable';

export const IPoolable = Symbol.for('IPoolable');
export interface IPoolable extends IDisposable {
    fromPoolHashCode?: number;
    release?(): void;
}
