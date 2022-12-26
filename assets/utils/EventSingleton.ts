/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { clazz } from '../decorators/clazz';
import { EventDispatcher } from '../event/EventDispatcher';

@clazz('EventSingleton')
export class EventSingleton extends EventDispatcher {
    public static Instance<T extends {}>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }

    public constructor() {
        super();
    }
}
