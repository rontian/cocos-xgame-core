/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/

import { InjectableAttribute } from '../core/InjectableAttribute';
import { ServiceContainer } from '../core/ServiceContainer';
import { IMethodParamAttribute } from '../interfaces/IMethodParamAttribute';

export function injectable(): any {
    return function (target: any, key?: string, descriptor?: TypedPropertyDescriptor<Function>): any {
        if (key && descriptor) {
            const invoke = descriptor.value;
            descriptor.value = function () {
                const len = arguments.length;
                let last = 0;
                let attributes = ServiceContainer.Instance().getAttributes<IMethodParamAttribute>(target, IMethodParamAttribute);
                if (attributes && attributes.length) {
                    attributes = attributes.filter((item) => item.key == key, this);
                    for (const attr of attributes) {
                        arguments[attr.index] = ServiceContainer.Instance().getService(attr.identity, attr.named);
                        last = attr.index;
                    }
                }
                if (len <= last) {
                    arguments.length = last + 1;
                }
                return invoke.apply(this, arguments);
            };
        } else {
            //依赖注入标识
            const attribute = new InjectableAttribute();
            ServiceContainer.Instance().addAttributes(target, attribute);
        }
    };
}
