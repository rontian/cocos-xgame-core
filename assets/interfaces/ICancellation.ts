/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-12-14
*************************************************/

import { IDisposable } from './IDisposable';

export const ICancellation = Symbol.for('ICancellation');
export interface ICancellation extends IDisposable {
    cancel(): void;
}
