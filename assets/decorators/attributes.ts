/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { ServiceContainer } from '../core/ServiceContainer';
import { IAttribute } from '../interfaces/IAttribute';

export function attributes(...args: IAttribute[]): any {
    return function (target: any) {
        for (const attribute of args) {
            ServiceContainer.Instance().addAttributes(target, attribute);
        }
    };
}
