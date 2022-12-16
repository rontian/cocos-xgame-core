/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

import { EventAttribute } from '../event/EventAttribute';
import { ServiceContainer } from './../core/ServiceContainer';

export function event(eventName: string, moduleId?: number, priority?: number) {
    return (target: any, key: string, descriptor?: TypedPropertyDescriptor<Function>) => {
        const method = descriptor.value;
        const invoke = (descriptor.value = function () {
            method.apply(this, arguments);
        });
        const attribute = new EventAttribute(invoke, eventName, moduleId, priority);
        ServiceContainer.Instance().addAttributes(target, attribute);
    };
}
