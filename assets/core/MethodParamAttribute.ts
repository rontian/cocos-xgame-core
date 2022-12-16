/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { IMethodParamAttribute } from '../interfaces/IMethodParamAttribute';
import { Attribute } from './Attribute';

@facade(IMethodParamAttribute)
@clazz('MethodParamAttribute')
export class MethodParamAttribute extends Attribute implements IMethodParamAttribute {
    public identity: symbol;

    public named: string;

    public key: string;

    public index: number;

    public constructor(identity: symbol, key: string, index: number, named?: string) {
        super();
        this.identity = identity;
        this.key = key;
        this.index = index;
        this.named = named;
    }
}
