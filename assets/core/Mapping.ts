/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-01-14
*************************************************/

import { clazz } from '../decorators/clazz';
import { IMapping } from '../interfaces/IMapping';
import { XObject } from './XObject';

@clazz('Mapping')
export class Mapping extends XObject implements IMapping {
    public identity: symbol;

    public service: { new (...args: any[]): any };

    private aliases: Map<symbol, symbol>;

    private instance: any;

    private namedInstances = new Map<string, any>();

    public constructor(aliases: Map<symbol, symbol>, identity: symbol, service: { new (...args: any[]): any }) {
        super();
        this.identity = identity;
        this.service = service;
        this.aliases = aliases;
    }

    public withInstance(instance: any, named?: string): IMapping {
        if (!named) {
            this.instance = instance;
        } else {
            this.namedInstances.set(named, instance);
        }
        return this;
    }

    public setAlias(identity: symbol): IMapping {
        this.aliases.set(identity, this.identity);
        return this;
    }

    public create(named?: string): any {
        if (!named) {
            if (!this.instance) {
                this.instance = new this.service();
            }
            return this.instance;
        }
        if (this.namedInstances.has(named)) {
            return this.namedInstances.get(named);
        }
        const instance = new this.service();
        this.namedInstances.set(named, instance);
        return instance;
    }
}
