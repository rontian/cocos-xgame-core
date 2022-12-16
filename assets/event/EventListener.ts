/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { DisposableObject } from '../core/DisposableObject';
import { IEventManager } from './IEventManager';
import { Event } from './Event';
import { clazz } from '../decorators/clazz';

@clazz('EventListener')
export class EventListener extends DisposableObject {
    public constructor(
        private manager: IEventManager,
        public moduleid: number,
        public type: string,
        public listener: (e?: Event) => void,
        public thisObject?: any,
        public useCapture?: boolean,
        public priority?: number
    ) {
        super();
    }

    public dispose(): void {
        this.manager.removeEventListener(this.moduleid, this.type, this.listener, this.thisObject, this.useCapture);
    }
}
