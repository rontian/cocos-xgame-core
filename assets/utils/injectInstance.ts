/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-19
*************************************************/

import { ServiceContainer } from '../core/ServiceContainer';
import { IPropertyAttribute } from '../interfaces/IPropertyAttribute';

export function injectInstance<T>(instance: T): T {
    const type = typeof instance;
    if (!instance || type != 'object') {
        throw new Error('对象依赖注入失败:' + instance);
    }
    const attributes = ServiceContainer.Instance().getAttributes<IPropertyAttribute>(instance, IPropertyAttribute);
    if (attributes && attributes.length) {
        for (const attr of attributes) {
            if (ServiceContainer.Instance().isMapping(attr.identity)) {
                (<any>instance)[attr.key] = ServiceContainer.Instance().getService(attr.identity, attr.named);
            }
        }
    }
    return instance;
}
