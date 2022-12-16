import { IAttribute } from '../interfaces/IAttribute';

export const IEventAttribute = Symbol.for('IEventAttribute');
export interface IEventAttribute extends IAttribute {
    invoke: Function;
    eventName: string;
    moduleId: number;
    priority: number;
}
