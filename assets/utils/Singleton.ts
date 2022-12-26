/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { clazz } from '../decorators/clazz';
import { EventDispatcher } from '../event/EventDispatcher';

@clazz('Singleton')
export class Singleton extends EventDispatcher {
    public static Instance<T extends {}>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }
}
