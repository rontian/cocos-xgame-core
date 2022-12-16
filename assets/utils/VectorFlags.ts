/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

import { XObject } from '../core/XObject';
import { Dictionary } from './Dictionary';

export enum FlagsCheckType {
    And,
    Or,
}
export class VectorFlags<T extends number | string> extends XObject {
    private flags: Dictionary<T, boolean> = new Dictionary<T, boolean>();

    public checkFlags(flags: T[], type: FlagsCheckType = FlagsCheckType.And): boolean {
        let count = 0;
        for (const f of flags) {
            if (this.flags.containsKey(f)) {
                count++;
                if (type == FlagsCheckType.Or) {
                    break;
                }
            }
        }
        return count > 0;
    }

    public addFlags(...flags: T[]): void {
        for (const f of flags) {
            if (!this.flags.containsKey(f)) {
                this.flags.add(f, true);
            }
        }
    }

    public removeFlags(...flags: T[]): void {
        this.flags.removeKeys(flags);
    }
}
