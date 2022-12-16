export function getPropertyDescriptor(target: any, key: PropertyKey): PropertyDescriptor {
    let describe = Object.getOwnPropertyDescriptor(target, key);
    if (!describe) {
        describe = {};
    }
    return describe;
}
