/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/

import { IMapping } from './IMapping';
import { IServiceProvider } from './IServiceProvider';

export const IXGame = Symbol.for('IXGame');
export interface IXGame {
    init(): Promise<void>;
    tick(deltaTime: number): void;
    singleton(identity: symbol, service: { new (...args: any[]): any }): IMapping;
    getService<T>(identity: symbol): T;
    registerServiceProvider(provider: IServiceProvider): IXGame;
}
