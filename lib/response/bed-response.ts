import { StatusCode } from "hono/utils/http-status";

export default class BedResponse {
    private body: unknown;
    private statusCode: StatusCode;

    constructor(statusCode: StatusCode, body: unknown) {
        this.statusCode = statusCode;
        this.body = body;
    }

    getBody(): unknown {
        return this.body;
    }

    getStatusCode(): StatusCode {
        return this.statusCode;
    }
}
