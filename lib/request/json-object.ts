interface JSONObject {
    getString(key: string): string;
    getStringOptional(key: string): string | undefined;
    getStringArray(key: string): string[];
    getStringArrayOptional(key: string): string[] | undefined;

    getNumber(key: string): number;
    getNumberOptional(key: string): number | undefined;
    getNumberArray(key: string): number[];
    getNumberArrayOptional(key: string): number[] | undefined;

    getBoolean(key: string): boolean;
    getBooleanOptional(key: string): boolean | undefined;
    getBooleanArray(key: string): boolean[];
    getBooleanArrayOptional(key: string): boolean[] | undefined;

    getObject(key: string): JSONObject;
    getObejectOptional(key: string): JSONObject | undefined;
    getObjectArray(key?: string): JSONObject[];
    getObjectArrayOptional(key: string): JSONObject[] | undefined;
}

export default JSONObject;
