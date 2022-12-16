/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-12-15
*************************************************/
import { getPropertyDescriptor } from '../utils/getPropertyDescriptor';
import { setPropertyDescriptor } from '../utils/setPropertyDescriptor';
import { toBoolean } from '../utils/toBoolean';

export function writable(disable?: boolean) {
    return function (taregt: any, key: PropertyKey) {
        const describe = getPropertyDescriptor(taregt, key);
        describe.writable = !toBoolean(disable);
        setPropertyDescriptor(taregt, key, describe);
        return taregt;
    };
}
