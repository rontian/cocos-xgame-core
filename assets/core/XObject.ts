/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { IXObject } from '../interfaces/IXObject';
import { getQualifiedClassName } from '../utils/getQualifiedClassName';

export let hashCount = 1;
export function generateHashCode(target?: any): number {
    const hashCode = hashCount++;
    if (target && target.hashCode == undefined) {
        target.hashCode = hashCode;
    }
    return hashCode;
}
@facade(IXObject)
@clazz('XObject')
export class XObject implements IXObject {
    private $hashCode = 0;

    public constructor() {
        this.$hashCode = generateHashCode();
    }

    public get hashCode(): number {
        return this.$hashCode;
    }

    public toString(): string {
        return '{0}({1})'.format(getQualifiedClassName(this), this.hashCode);
    }
}
