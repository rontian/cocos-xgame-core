/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { IPropertyAttribute } from '../interfaces/IPropertyAttribute';
import { Attribute } from './Attribute';

@facade(IPropertyAttribute)
@clazz('PropertyAttribute')
export class PropertyAttribute extends Attribute implements IPropertyAttribute {
    public identity: symbol;

    public named: string;

    public key: string;

    public constructor(identity: symbol, key: string, named?: string) {
        super();
        this.identity = identity;
        this.key = key;
        this.named = named;
    }
}
