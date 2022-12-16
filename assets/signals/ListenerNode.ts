/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';

/**
 * A node in the list of listeners in a signal.
 */
@clazz('ListenerNode')
export class ListenerNode extends XObject {
    public previous: ListenerNode;

    public next: ListenerNode;

    public listener: Function;

    public thisObject: any;

    public once: boolean;

    public priority: number;

    public switchNode(node: ListenerNode): void {
        const listener = node.listener;
        const thisObject = node.thisObject;
        const once = node.once;
        const priority = node.priority;
        node.listener = this.listener;
        node.thisObject = this.thisObject;
        node.once = this.once;
        node.priority = this.priority;
        this.listener = listener;
        this.thisObject = thisObject;
        this.once = once;
        this.priority = priority;
    }

    public execute(...args: any[]): boolean {
        if (this.listener != null) {
            let i: number;
            const maxNumArgs: number = this.listener.length;
            for (i = args.length; i < maxNumArgs; ++i) {
                args[i] = null;
            }
            switch (maxNumArgs) {
                case 0:
                    return this.listener.apply(this.thisObject);
                default:
                    return this.listener.apply(this.thisObject, args.slice(0, maxNumArgs));
            }
        }
    }
}
