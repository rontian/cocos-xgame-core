/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { IXObject } from '../../interfaces/IXObject';
import { XTaskMode } from '../structs/XTaskMode';
import { IXTask } from './IXTask';

export const IXTaskManager = Symbol.for('IXTaskManager');
export interface IXTaskManager extends IXObject {
    addTask<T extends IXTask>(onMainRunning: boolean, task: new (mode?: XTaskMode, life?: number) => T): T;
    addTask(onMainRunning: boolean, task: IXTask): IXTask;

    removeTask(task: IXTask): void;
    removeTask(hashCode: number): void;

    pause(): void;
    resume(): void;
}
