import { XObject } from '../core/XObject';
import { clazz } from '../decorators/clazz';
import { Watcher } from './Watcher';

function joinValues(templates: any[]): any {
    const first = templates[0];
    let value = first instanceof Watcher ? first.getValue() : first;
    const length = templates.length;
    for (let i = 1; i < length; i++) {
        let item = templates[i];
        if (item instanceof Watcher) {
            item = item.getValue();
        }
        value += item;
    }
    return value;
}

@clazz('Binding')
export class Binding extends XObject {
    public static bindProperty(host: any, chain: string[], target: any, prop: string): Watcher {
        const watcher = Watcher.watch(host, chain, null, null);
        if (watcher) {
            const assign = function (value: any): void {
                target[prop] = value;
            };
            watcher.setHandler(assign, null);
            assign(watcher.getValue());
        }
        return watcher;
    }

    public static bindHandler(host: any, chain: string[], handler: (value: any) => void, thisObject: any): Watcher {
        const watcher = Watcher.watch(host, chain, handler, thisObject);
        if (watcher) {
            handler.call(thisObject, watcher.getValue());
        }
        return watcher;
    }

    private static $bindProperties(host: any, templates: any[], chainIndex: number[], target: any, prop: string): Watcher {
        if (templates.length == 1 && chainIndex.length == 1) {
            return Binding.bindProperty(host, templates[0].split('.'), target, prop);
        }

        const assign = function (): void {
            target[prop] = joinValues(templates);
        };
        const length = chainIndex.length;
        let watcher: Watcher;
        for (let i = 0; i < length; i++) {
            const index = chainIndex[i];
            const chain = templates[index].split('.');
            watcher = Watcher.watch(host, chain, null, null);
            if (watcher) {
                templates[index] = watcher;
                watcher.setHandler(assign, null);
            }
        }
        assign();
        return watcher;
    }
}
