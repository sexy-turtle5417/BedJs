import { StatusCode } from "hono/utils/http-status";
import BedResponse from "./bed-response";

export default class BedResponseBuilder {
    private responseBody: unknown = {};
    private responseStatus: StatusCode = 200;

    status(status: StatusCode): BedResponseBuilder {
        this.responseStatus = status;
        return this;
    }

    body(body: unknown): BedResponseBuilder {
        this.responseBody = body;
        return this;
    }

    build(): BedResponse {
        return new BedResponse(this.responseStatus, this.responseBody);
    }
}
