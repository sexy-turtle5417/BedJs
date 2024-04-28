import { Context, TypedResponse } from "hono";
import HttpError from "./http.error";

class ForbiddenError extends HttpError {
    constructor() {
        super(`Forbidden`);
    }

    async handle(
        context: Context<any, any, {}>
    ): Promise<Response & TypedResponse> {
        context.status(403);
        return context.json({ message: this.message });
    }
}

export default ForbiddenError;
