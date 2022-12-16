/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
export enum XTaskState {
    UnInitialize = 1,
    Initialized,
    Validated,
    Executing,
    SelfCompleted,
    Failured,
    Completed,
}
