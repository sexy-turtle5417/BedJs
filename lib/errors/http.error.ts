import { Context, TypedResponse } from "hono";

abstract class HttpError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }

    abstract handle(context: Context): Promise<Response & TypedResponse>;
}

export default HttpError;
