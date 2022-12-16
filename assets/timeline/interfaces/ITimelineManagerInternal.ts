/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

export const ITimelineManagerInternal = Symbol.for('ITimelineManagerInternal');
export interface ITimelineManagerInternal {
    initialize(): void;
}
