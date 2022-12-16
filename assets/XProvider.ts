/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/

import { XObject } from './core/XObject';
import { DateTimeManager } from './date/DateTimeManager';
import { IDateTimeManager } from './date/IDateTimeManager';
import { clazz } from './decorators/clazz';
import { facade } from './decorators/facade';
import { EventManager } from './event/EventManager';
import { IEventManager } from './event/IEventManager';
import { IServiceProvider } from './interfaces/IServiceProvider';
import { IXGame } from './interfaces/IXGame';
import { IPoolManager } from './pool/IPoolManager';
import { PoolManager } from './pool/PoolManager';
import { ISchedulerManager } from './scheduler/ISchedulerManager';
import { SchedulerManager } from './scheduler/SchedulerManager';
import { ITimelineManager } from './timeline/interfaces/ITimelineManager';
import { ITimelineManagerInternal } from './timeline/interfaces/ITimelineManagerInternal';
import { TimelineManager } from './timeline/TimelineManager';
import { getQualifiedClassName } from './utils/getQualifiedClassName';
import { IXTaskManager } from './xtask/interfaces/IXTaskManager';
import { IXTaskManagerInternal } from './xtask/interfaces/IXTaskManagerInternal';
import { XTaskManager } from './xtask/XTaskManager';

@facade(IServiceProvider)
@clazz('XProvider')
export class XProvider extends XObject implements IServiceProvider {
    public constructor() {
        super();
    }

    public priority = 99999;

    public async onInit(game: IXGame): Promise<boolean> {
        return true;
    }

    public async onStart(game: IXGame): Promise<boolean> {
        game.getService<IXTaskManagerInternal>(IXTaskManagerInternal).initialize();
        //game.getService<IPlayableManagerInternal>(IPlayableManagerInternal).initialize();
        return true;
    }

    public onServiceRegister(game: IXGame): void {
        //注册实用类
        game.singleton(IDateTimeManager, DateTimeManager).withInstance(DateTimeManager.Instance());
        console.log('[XProvider]: 注册管理器{0}'.format(getQualifiedClassName(DateTimeManager)));
        game.singleton(IPoolManager, PoolManager).withInstance(PoolManager.Instance());
        console.log('[XProvider]: 注册管理器{0}'.format(getQualifiedClassName(PoolManager)));
        game.singleton(IEventManager, EventManager).withInstance(EventManager.Instance());
        console.log('[XProvider]: 注册管理器{0}'.format(getQualifiedClassName(EventManager)));
        game.singleton(ISchedulerManager, SchedulerManager).withInstance(SchedulerManager.Instance());
        console.log('[XProvider]: 注册管理器{0}'.format(getQualifiedClassName(SchedulerManager)));
        game.singleton(IXTaskManager, XTaskManager).withInstance(XTaskManager.Instance()).setAlias(IXTaskManagerInternal);
        console.log('[XProvider]: 注册管理器{0}'.format(getQualifiedClassName(XTaskManager)));
        game.singleton(ITimelineManager, TimelineManager).withInstance(TimelineManager.Instance()).setAlias(ITimelineManagerInternal);
        console.log('[XProvider]: 注册管理器{0}'.format(getQualifiedClassName(TimelineManager)));
    }
}
