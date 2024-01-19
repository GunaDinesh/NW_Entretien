/**
 * Gets nested values in a object
 * @param {any} object
 * @param {string} path - The path written seperated as keys separated by "."
 *
 * @example
 * // returns "baz"
 * get({foo: {bar: "baz"}}, "foo.bar")
 */
export const get = (object: any, path: string) => {
    const keys = path.split(".");
    const firstKey = keys.shift();
    try {
        const newObject = object[firstKey];

        if (keys.length === 0) return newObject;
        return get(newObject, keys.join("."));
    } catch {
        throw new Error(`Object ${object} cannot access key: ${firstKey}`);
    }
};

/**
 * Gets nested max from an array of objects
 * @param {any} object
 * @param {string} path - The path written seperated as keys separated by ".". It should lead to a numeric value
 *
 * @example
 * // returns 11
 * getMax([{id: 9}, {id: 11}], "id")
 */
export const getMax = (objects: any[], path: string): number | null => {
    if (objects.length === 0) return null;
    const values: number[] = objects.map((object) => get(object, path));
    return Math.max(...values);
};
