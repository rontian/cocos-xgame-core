/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
import 'reflect-metadata';
import { IAttribute } from '../interfaces/IAttribute';
import { Singleton } from '../utils/Singleton';
import { Mapping } from './Mapping';
import { IMapping } from '../interfaces/IMapping';
import { is } from '../utils/is';
import { clazz } from '../decorators/clazz';
import { Dictionary } from '../utils/Dictionary';
import { isObject } from '../utils/isObject';
import { isUndefined } from '../utils/isUndefined';

export const METADATA_ATTRIBUTES_KEY = 'xgame:attributes';

@clazz('ServiceContainer')
export class ServiceContainer extends Singleton {
    private mappings = new Map<symbol, Mapping>();

    private aliases = new Map<symbol, symbol>();

    public constructor() {
        super();
    }

    public addAttributes(target: any, attribute: IAttribute, metadataKey?: string): ServiceContainer {
        metadataKey = metadataKey ? metadataKey : METADATA_ATTRIBUTES_KEY;
        const attributes = this.getOrCreateMetadata(metadataKey, target);
        attributes.push(attribute);
        return this;
    }

    private getOrCreateMetadata(metadataKey: string, target: any): IAttribute[] {
        let attributes: IAttribute[] = [];
        if (Reflect.hasOwnMetadata(metadataKey, target)) {
            attributes = Reflect.getMetadata(metadataKey, target);
        } else {
            Reflect.defineMetadata(metadataKey, attributes, target);
        }
        return attributes;
    }

    public hasAttribute<T extends IAttribute>(target: any, identity: symbol, metadataKey?: string): boolean {
        if (this.getAttribute<T>(target, identity, metadataKey)) {
            return true;
        }
        return false;
    }

    public getAttributes<T extends IAttribute>(target: any, identity: symbol, metadataKey?: string, recursive?: boolean): T[] {
        let results: IAttribute[] = [...this.getOwnAttributes(target, identity, metadataKey)];
        let prototype = Object.getPrototypeOf(target);
        while (prototype) {
            const superResults = this.getOwnAttributes(prototype, identity, metadataKey);
            results = [...results, ...superResults];
            prototype = Object.getPrototypeOf(prototype);
            if (!prototype) {
                break;
            }
        }
        const clean = new Dictionary<number, IAttribute>();
        for (const attr of results) {
            if (!clean.containsKey(attr.hashCode)) {
                clean.add(attr.hashCode, attr);
            }
        }
        results.length = 0;
        results.push(...clean.values);
        clean.clear();
        return <T[]>results;
    }

    public getAttributesOf<T extends IAttribute>(targets: any[], identity: symbol, metadataKey?: string): T[] {
        let results: IAttribute[] = [];
        for (const target of targets) {
            if (!isUndefined(target)) {
                const attributes = this.getOwnAttributes(target, identity, metadataKey);
                results = [...results, ...attributes];
            }
        }
        return <T[]>results;
    }

    public getOwnAttributes<T extends IAttribute>(target: any, identity: symbol, metadataKey?: string): T[] {
        metadataKey = metadataKey ? metadataKey : METADATA_ATTRIBUTES_KEY;
        const results: IAttribute[] = [];
        if (isObject(target)) {
            const attributes: IAttribute[] = Reflect.getMetadata(metadataKey, target) || [];
            if (attributes && attributes.length) {
                for (const attr of attributes) {
                    if (is(attr, identity)) {
                        results.push(attr);
                    }
                }
            }
        }
        return <T[]>results;
    }

    public getAttribute<T extends IAttribute>(target: any, identity: symbol, metadataKey?: string): T {
        const attributes = this.getAttributes<T>(target, identity, metadataKey);
        if (attributes && attributes.length) {
            return attributes[0];
        }
        return null;
    }

    public isMapping(identity: symbol): boolean {
        if (this.aliases.has(identity)) {
            identity = this.aliases.get(identity);
        }
        return this.mappings.has(identity);
    }

    public bind(identity: symbol, service: { new (...args: any[]): any }): IMapping {
        return this.getOrCreate(identity, service);
    }

    public singleton(identity: symbol, service: { new (...args: any[]): any }): IMapping {
        return this.getOrCreate(identity, service);
    }

    private getOrCreate(identity: symbol, service: { new (...args: any[]): any }): IMapping {
        if (this.mappings.has(identity)) {
            return this.mappings.get(identity);
        }
        const binding = new Mapping(this.aliases, identity, service);
        this.mappings.set(identity, binding);
        return binding;
    }

    public getService<T>(identity: symbol, named?: string): T {
        if (this.aliases.has(identity)) {
            identity = this.aliases.get(identity);
        }
        if (!this.mappings.has(identity)) {
            throw new Error('xgame.Container [' + identity.toString() + '] 此类型没有还没有注册.');
        }
        const binding = this.mappings.get(identity);
        return binding.create(named);
    }
}
