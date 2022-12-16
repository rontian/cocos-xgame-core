/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { IEventDispatcher } from '../event/IEventDispatcher';
import { Event } from '../event/Event';
import { clazz } from '../decorators/clazz';

@clazz('PropertyEvent')
export class PropertyEvent extends Event {
    public static PROPERTY_CHANGE = 'propertyChange';

    public constructor(type: string, bubbles?: boolean, cancelable?: boolean, property?: string) {
        super(type, bubbles, cancelable);
        this.property = property;
    }

    public property: string;

    public static dispatchPropertyEvent(target: IEventDispatcher, eventType: string, property?: string): boolean {
        if (!target.hasEventListener(eventType)) {
            return true;
        }
        const event = Event.create(PropertyEvent, eventType);
        event.property = property;
        const result = target.dispatchEvent(event);
        Event.release(event);
        return result;
    }
}
