/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { clazz } from '../decorators/clazz';
import { Singleton } from '../utils/Singleton';

@clazz('Time')
export class Time extends Singleton {
    public deltaTime = 0;

    public timeScale = 1;

    public passedTime = 0;
}
