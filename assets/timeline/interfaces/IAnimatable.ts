/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

import { IXObject } from '../../interfaces/IXObject';

/**
 * 播放动画接口
 */
export interface IAnimatable extends IXObject {
    advanceTime(time: number): void;
}
