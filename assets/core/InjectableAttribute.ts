/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/
import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { IInjectableAttribute } from '../interfaces/IInjectableAttribute';
import { Attribute } from './Attribute';

@facade(IInjectableAttribute)
@clazz('InjectableAttribute')
export class InjectableAttribute extends Attribute implements IInjectableAttribute {
    public injectable: boolean;

    public constructor() {
        super();
        this.injectable = true;
    }
}
