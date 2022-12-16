/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { XObject } from './XObject';
import { IAttribute } from '../interfaces/IAttribute';
import { facade } from '../decorators/facade';
import { clazz } from '../decorators/clazz';

@facade(IAttribute)
@clazz('Attribute')
export class Attribute extends XObject implements IAttribute {}
