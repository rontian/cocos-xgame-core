/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { IXObject } from '../../interfaces/IXObject';
import { XTaskLifeMode } from '../structs/XTaskLifeMode';
import { XTaskMode } from '../structs/XTaskMode';
import { XTaskResult } from '../structs/XTaskResult';
import { XTaskState } from '../structs/XTaskState';

export const IXTask = Symbol.for('IXTask');
export interface IXTask extends IXObject {
    name: string;
    mode: XTaskMode;
    state: XTaskState;
    result: XTaskResult;
    lifeMode: XTaskLifeMode;

    onMainRunning: boolean;

    parent: IXTask;
    root: IXTask;

    lifeCount: number;

    childCount: number;

    addTask<T extends IXTask>(task: new () => T): T;
    addTask(task: IXTask): IXTask;
    removeTask(hashCode: number): void;
    removeTask(task: IXTask): void;
    //主循环
    mainLoop(): void;
    //生命周期
    initialize(): void;
    validate(): boolean;
    execute(): Promise<void>;
    update(): void;
    selfComplete(result?: XTaskResult): void;
    complete(): void;
    failure(): void;
    reset(): void;
}
