/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

import { IXGame } from './IXGame';

export const IServiceProvider = Symbol.for('IServiceProvider');
export interface IServiceProvider {
    priority: number;
    onInit(game: IXGame): Promise<boolean>;
    onStart(game: IXGame): Promise<boolean>;
    onServiceRegister(game: IXGame): void;
}
