/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/

import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';
import { ListenerNode } from './ListenerNode';

/**
 * This internal class maintains a pool of deleted listener nodes for reuse by framework. This reduces
 * the overhead from object creation and garbage collection.
 */
@clazz('ListenerNodePool')
export class ListenerNodePool extends XObject {
    private tail: ListenerNode;

    private cacheTail: ListenerNode;

    public get(): ListenerNode {
        if (this.tail) {
            const node: ListenerNode = this.tail;
            this.tail = this.tail.previous;
            node.previous = null;
            return node;
        } else {
            return new ListenerNode();
        }
    }

    public dispose(node: ListenerNode): void {
        node.listener = null;
        node.thisObject = null;
        node.once = false;
        node.next = null;
        node.previous = this.tail;
        this.tail = node;
    }

    public cache(node: ListenerNode): void {
        node.listener = null;
        node.thisObject = null;
        node.previous = this.cacheTail;
        this.cacheTail = node;
    }

    public releaseCache(): void {
        while (this.cacheTail) {
            const node: ListenerNode = this.cacheTail;
            this.cacheTail = node.previous;
            node.next = null;
            node.previous = this.tail;
            this.tail = node;
        }
    }
}
