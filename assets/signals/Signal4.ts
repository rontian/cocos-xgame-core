/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

import { clazz } from '../decorators/clazz';
import { ListenerNode } from './ListenerNode';
import { SignalBase } from './SignalBase';

/**
 * Provides a fast signal for use where three parameters are dispatched with the signal.
 */
clazz('Signal4');
export class Signal4<T1, T2, T3, T4> extends SignalBase {
    public dispatch(o1: T1, o2: T2, o3: T3, o4: T4): void {
        this.startDispatch();
        let node: ListenerNode;
        for (node = this.head; node; node = node.next) {
            const cancel = node.execute(o1, o2, o3, o4);
            if (node.once) {
                this.remove(node.listener);
            }
            if (cancel) {
                break;
            }
        }
        this.endDispatch();
    }

    public add(listener: (o1: T1, o2: T2, o3: T3, o4: T4) => void, thisObject: any = null, priority = 0): void {
        super.add(listener, thisObject, priority);
    }

    public addOnce(listener: (o1: T1, o2: T2, o3: T3, o4: T4) => void, thisObject: any = null, priority = 0): void {
        super.addOnce(listener, thisObject, priority);
    }
}
