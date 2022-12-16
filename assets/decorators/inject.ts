/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

import { MethodParamAttribute } from '../core/MethodParamAttribute';
import { PropertyAttribute } from '../core/PropertyAttribute';
import { ServiceContainer } from '../core/ServiceContainer';

export function inject(identity: any, named?: string) {
    return (target: any, key: string, indexOrDescriptor?: number | TypedPropertyDescriptor<Function>) => {
        if (indexOrDescriptor != undefined && typeof indexOrDescriptor == 'number') {
            //方法参数注入
            const attribute = new MethodParamAttribute(identity, key, <number>indexOrDescriptor, named);
            ServiceContainer.Instance().addAttributes(target, attribute);
        } else {
            //属性依赖注入
            const attribute = new PropertyAttribute(identity, key, named);
            ServiceContainer.Instance().addAttributes(target, attribute);
        }
    };
}
