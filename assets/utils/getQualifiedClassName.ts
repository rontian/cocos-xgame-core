/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-29
*************************************************/
/**
 * Return the fully qualified class name of an object
 * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
 * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
 * @returns A string containing the fully qualified class name.
 */
export function getQualifiedClassName(value: any): string {
    const type = typeof value;
    if (!value || (type != 'object' && !value.prototype)) {
        return type;
    }
    const prototype: any = value.prototype ? value.prototype : Object.getPrototypeOf(value);
    if (!prototype) {
        return type;
    }
    if (prototype.hasOwnProperty('__class__')) {
        return prototype['__class__'];
    }
    const constructorString: string = prototype.constructor.toString().trim();
    const index: number = constructorString.indexOf('(');
    const className: string = constructorString.substring(9, index);
    Object.defineProperty(prototype, '__class__', {
        value: className,
        enumerable: false,
        writable: true,
    });
    return className;
}
