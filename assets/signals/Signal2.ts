/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

import { clazz } from '../decorators/clazz';
import { ListenerNode } from './ListenerNode';
import { SignalBase } from './SignalBase';

/**
 * Provides a fast signal for use where two parameters are dispatched with the signal.
 */
@clazz('Signal2')
export class Signal2<T1, T2> extends SignalBase {
    public dispatch(o1: T1, o2: T2): void {
        this.startDispatch();
        let node: ListenerNode;
        for (node = this.head; node; node = node.next) {
            const cancel = node.execute(o1, o2);
            if (node.once) {
                this.remove(node.listener);
            }
            if (cancel) {
                break;
            }
        }
        this.endDispatch();
    }

    public add(listener: (o1: T1, o2: T2) => void, thisObject: any = null, priority = 0): void {
        super.add(listener, thisObject, priority);
    }

    public addOnce(listener: (o1: T1, o2: T2) => void, thisObject: any = null, priority = 0): void {
        super.addOnce(listener, thisObject, priority);
    }
}
