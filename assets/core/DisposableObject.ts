/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/

import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { IDisposable } from '../interfaces/IDisposable';
import { XObject } from './XObject';

@facade(IDisposable)
@clazz('DisposableObject')
export class DisposableObject extends XObject implements IDisposable {
    public constructor() {
        super();
    }

    public dispose(): void {}
}
