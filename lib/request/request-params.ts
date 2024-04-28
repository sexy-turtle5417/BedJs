interface BedParams {
    get(key: string): string;
    getQueryParam(key: string): string | undefined;
    getQueryParamAsNumber(key: string): number | undefined;
}

export default BedParams;
