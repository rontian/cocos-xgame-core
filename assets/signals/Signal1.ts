/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

import { clazz } from '../decorators/clazz';
import { ListenerNode } from './ListenerNode';
import { SignalBase } from './SignalBase';

/**
 * Provides a fast signal for use where one parameter is dispatched with the signal.
 */
@clazz('Signal1')
export class Signal1<T> extends SignalBase {
    public dispatch(o: T): void {
        this.startDispatch();
        let node: ListenerNode;
        for (node = this.head; node; node = node.next) {
            const cancel = node.execute(o);
            if (node.once) {
                this.remove(node.listener);
            }
            if (cancel) {
                break;
            }
        }
        this.endDispatch();
    }

    public add(listener: (result: T) => void, thisObject: any = null, priority = 0): void {
        super.add(listener, thisObject, priority);
    }

    public addOnce(listener: (result: T) => void, thisObject: any = null, priority = 0): void {
        super.addOnce(listener, thisObject, priority);
    }
}
