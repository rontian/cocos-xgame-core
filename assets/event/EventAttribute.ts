/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-12-14
*************************************************/

import { Attribute } from '../core/Attribute';
import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { IEventAttribute } from './IEventAttribute';

@facade(IEventAttribute)
@clazz('EventAttribute')
export class EventAttribute extends Attribute implements IEventAttribute {
    public constructor(public invoke: Function, public eventName: string, public moduleId = 0, public priority: number = 0) {
        super();
    }
}
