/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-23
*************************************************/

import { getFacades } from './getFacades';

export function isFacade(target: any, api: symbol): boolean {
    const apis = getFacades(target);
    return apis.indexOf(api) >= 0;
}
