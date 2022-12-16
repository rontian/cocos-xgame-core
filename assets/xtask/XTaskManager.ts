/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { clazz } from '../decorators/clazz';
import { facade } from '../decorators/facade';
import { SchedulerManager } from '../scheduler/SchedulerManager';
import { Singleton } from '../utils/Singleton';
import { MainTask } from './core/MainTask';
import { IXTask } from './interfaces/IXTask';
import { IXTaskManager } from './interfaces/IXTaskManager';
import { IXTaskManagerInternal } from './interfaces/IXTaskManagerInternal';
import { XTaskMode } from './structs/XTaskMode';

@clazz('XTaskManager')
@facade(IXTaskManager)
export class XTaskManager extends Singleton implements IXTaskManager, IXTaskManagerInternal {
    public mainTask: MainTask;

    private isRunning = true;

    public constructor() {
        super();
    }

    public initialize(): void {
        this.mainTask = new MainTask();
        SchedulerManager.Instance().registerUpdate(this.onUpdate, this);
    }

    private onUpdate(): void {
        if (!this.isRunning) {
            return;
        }
        this.mainTask.mainLoop();
    }

    public addTask<T extends IXTask>(onMainRunning: boolean, task: new (mode?: XTaskMode, life?: number) => T): T;

    public addTask(onMainRunning: boolean, task: IXTask): IXTask;

    public addTask(onMainRunning: boolean, task: any, life = 0): any {
        const item = this.mainTask.addTask(task, life);
        item.onMainRunning = onMainRunning;
        return item;
    }

    public removeTask(task: IXTask): void;

    public removeTask(hashCode: number): void;

    public removeTask(task: any): void {
        this.mainTask.removeTask(task);
    }

    public pause(): void {
        this.isRunning = false;
    }

    public resume(): void {
        this.isRunning = true;
    }
}
