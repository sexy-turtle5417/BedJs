interface BedHeaders {
    get(key: string): string | undefined;
    getBearerToken(key: string): string;
}

export default BedHeaders;
