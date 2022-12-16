/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-01-07
*************************************************/

import { List } from './List';

export class Enumerable {
    /**
     * 在指定范围内生成一个整数序列。
     */
    public static range(start: number, count: number): List<number> {
        const result = new List<number>();
        while (count--) {
            result.add(start++);
        }
        return result;
    }

    /**
     * 生成包含一个重复值的序列。
     */
    public static repeat<T>(element: T, count: number): List<T> {
        const result = new List<T>();
        while (count--) {
            result.add(element);
        }
        return result;
    }
}
