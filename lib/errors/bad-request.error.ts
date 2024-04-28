import { Context, TypedResponse } from "hono";
import HttpError from "./http.error";

class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message);
    }

    async handle(
        context: Context<any, any, {}>
    ): Promise<Response & TypedResponse> {
        context.status(400);
        return context.json({ message: this.message });
    }
}

export default BadRequestError;
