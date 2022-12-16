/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

import { clazz } from '../decorators/clazz';
import { ListenerNode } from './ListenerNode';
import { SignalBase } from './SignalBase';

/**
 * Provides a fast signal for use where any number of parameters are dispatched with the signal.
 */
clazz('SignalAny');
export class SignalAny extends SignalBase {
    public dispatch(...objects: any[]): void {
        this.startDispatch();
        let node: ListenerNode;
        for (node = this.head; node; node = node.next) {
            const cancel: boolean = node.execute(...objects);
            if (node.once) {
                this.remove(node.listener);
            }
            if (cancel) {
                break;
            }
        }
        this.endDispatch();
    }
}
