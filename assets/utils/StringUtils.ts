/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
export class StringUtils {
    public static html2Escape(html: string): string {
        const entities: any = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' };
        return html.replace(/[<>&"]/g, (c: string) => {
            return entities[c];
        });
    }

    public static escape2Html(html: string): string {
        const entities: any = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
        return html.replace(/&(lt|gt|nbsp|amp|quot);/gi, (c: string) => {
            return entities[c];
        });
    }

    public static nbsp2Space(html: string): string {
        const entities: any = { nbsp: ' ' };
        return html.replace(/&(nbsp);/gi, (c: string) => {
            return entities[c];
        });
    }

    private static reg_caches: RegExp[] = [];

    public static format(value: string, ...args: any[]): string {
        let reg: RegExp;
        const len: number = args.length;
        for (let i = 0; i < len; i++) {
            if (StringUtils.reg_caches[i]) {
                reg = StringUtils.reg_caches[i];
            } else {
                reg = new RegExp('\\{' + i + '\\}', 'gm');
                StringUtils.reg_caches[i] = reg;
            }
            value = value.replace(reg, args[i]);
        }
        return value;
    }

    public static beginWiths(originstr: string, beginstr: string): boolean {
        const index: number = originstr.indexOf(beginstr);
        if (index == 0) {
            return true;
        }
        return false;
    }

    public static endWiths(originstr: string, endstr: string): boolean {
        const str = originstr.slice(originstr.length - endstr.length);
        if (str == endstr) {
            return true;
        }
        return false;
    }

    public static trim(str: string, all?: boolean): string {
        str = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if (all) {
            str = str.replace(/\s+/g, '');
        }
        return str;
    }

    public static eraseHtml(str: string): string {
        return str.replace(/<\/?.+?>/g, '');
    }
}
String.prototype.beginWiths = function (str: string): boolean {
    return StringUtils.beginWiths(this as string, str);
};
String.prototype.endWiths = function (str: string): boolean {
    return StringUtils.endWiths(this as string, str);
};

String.prototype.trim = function (all?: boolean): string {
    return StringUtils.trim(this as string, all);
};
String.prototype.eraseHtml = function (): string {
    return StringUtils.eraseHtml(this as string);
};
String.prototype.html2Escape = function (): string {
    return StringUtils.html2Escape(this as string);
};
String.prototype.escape2Html = function (): string {
    return StringUtils.escape2Html(this as string);
};
String.prototype.nbsp2Space = function (): string {
    return StringUtils.nbsp2Space(this as string);
};
String.prototype.format = function (...args: any[]): string {
    return StringUtils.format(this as string, ...args);
};
String.prototype.padLeft = function (len: number, separator?: string): string {
    if (separator == undefined) {
        separator = ' ';
    }
    const s = this + '';
    if (s.length < len) {
        return new Array(len - s.length + 1).join(separator) + s;
    }
    return s;
};
String.prototype.padRight = function (len: number, separator?: string): string {
    if (separator == undefined) {
        separator = ' ';
    }
    const s = this + '';
    if (s.length < len) {
        return s + new Array(len - s.length + 1).join(separator);
    }
    return s;
};
declare global {
    interface String {
        format(...args: any[]): string;
        padLeft(len: number, separator?: string): string;
        padRight(len: number, separator?: string): string;
        trim(all?: boolean): string;
        eraseHtml(): string;
        beginWiths(str: string): boolean;
        endWiths(str: string): boolean;
        html2Escape(): string;
        escape2Html(): string;
        nbsp2Space(): string;
    }
}
