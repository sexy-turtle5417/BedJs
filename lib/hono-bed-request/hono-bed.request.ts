import { Context } from "hono";
import BedHeaders from "../request/bed-headers";
import BedRequest from "../request/bed-request";
import JSONObject from "../request/json-object";
import BedParams from "../request/request-params";
import ForbiddenError from "../errors/forbidden.error";
import { z } from "zod";
import BadRequestError from "../errors/bad-request.error";

class HonoHeaders implements BedHeaders {
    private context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    get(key: string): string | undefined {
        const value = this.context.req.header(key);
        if (!value) return undefined;
        return value;
    }

    getBearerToken(key: string): string {
        const authHeader = this.context.req.header(key);
        if (!authHeader) throw new ForbiddenError();
        const token = authHeader.split("Bearer ")[1];
        if (!token) throw new ForbiddenError();
        return token;
    }
}

class HonoParams implements BedParams {
    private context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    get(key: string): string {
        const value = this.context.req.param(key);
        return value;
    }

    getQueryParam(key: string): string | undefined {
        const value = this.context.req.query(key);
        return value;
    }

    getQueryParamAsNumber(key: string): number | undefined {
        const value = this.context.req.query(key);
        if (!value) return undefined;
        const numberValue = Number(value);
        const zod = z.number();
        const parseFailure = !zod.safeParse(numberValue).success;
        if (parseFailure)
            throw new BadRequestError(`'${key}' query param must be a number`);
        return numberValue;
    }
}

class HonoJSONObject implements JSONObject {
    private requestBody: any;

    constructor(requestBody: any) {
        this.requestBody = requestBody;
    }

    getString(key: string): string {
        const value = this.requestBody[key] as string;
        if (!value) throw new BadRequestError(`'${key}' is a required field`);
        const zod = z.string().min(1);
        const parseFailure = !zod.safeParse(value).success;
        if (parseFailure)
            throw new BadRequestError(`'${key}' must be a string`);
        return value;
    }

    getStringOptional(key: string): string | undefined {
        const value = this.requestBody[key] as string;
        if (!value) return undefined;
        return this.getString(key);
    }

    getStringArray(key: string): string[] {
        const value = this.requestBody[key] as string[];
        if (value == undefined)
            throw new BadRequestError(`'${key}' is a required field`);
        const zod = z.array(z.string());
        const parseFailure = !zod.safeParse(value).success;
        if (parseFailure)
            throw new BadRequestError(`'${key}' must be an array of strings`);
        return value;
    }

    getStringArrayOptional(key: string): string[] | undefined {
        const value = this.requestBody[key] as string[];
        if (value == undefined) return undefined;
        return this.getStringArray(key);
    }

    getNumber(key: string): number {
        const value = this.requestBody[key] as number;
        if (value == undefined)
            throw new BadRequestError(`'${key}' is a required field`);
        const zod = z.number();
        const parseFailure = !zod.safeParse(value);
        if (parseFailure)
            throw new BadRequestError(`'${key}' must be a number`);
        return value;
    }

    getNumberOptional(key: string): number | undefined {
        const value = this.requestBody[key] as number;
        if (value == undefined) return undefined;
        return this.getNumber(key);
    }

    getNumberArray(key: string): number[] {
        const value = this.requestBody[key] as number[];
        if (value == undefined)
            throw new BadRequestError(`'${key}' is a required field`);
        const zod = z.array(z.number());
        const parseFailure = !zod.safeParse(value).success;
        if (parseFailure)
            throw new BadRequestError(`'${key}' must be an array of numbers`);
        return value;
    }

    getNumberArrayOptional(key: string): number[] | undefined {
        const value = this.requestBody[key] as number[];
        if (value == undefined) return undefined;
        return this.getNumberArray(key);
    }

    getBoolean(key: string): boolean {
        const value = this.requestBody[key] as boolean;
        if (value == undefined)
            throw new BadRequestError(`'${key}' is a required field`);
        const zod = z.boolean();
        const parseFailure = !zod.safeParse(value).success;
        if (parseFailure)
            throw new BadRequestError(`;${key}' must be a boolean`);
        return value;
    }

    getBooleanOptional(key: string): boolean | undefined {
        const value = this.requestBody[key] as boolean;
        if (value == undefined) return undefined;
        return this.getBoolean(key);
    }

    getBooleanArray(key: string): boolean[] {
        const value = this.requestBody[key] as boolean[];
        if (value == undefined)
            throw new BadRequestError(`'${key}' is a required field`);
        const zod = z.array(z.boolean());
        const parseFailure = !zod.safeParse(value).success;
        if (parseFailure)
            throw new BadRequestError(`'${key}' must be an array of booleans`);
        return value;
    }

    getBooleanArrayOptional(key: string): boolean[] | undefined {
        const value = this.requestBody[key] as boolean;
        if (value == undefined) return undefined;
        return this.getBooleanArray(key);
    }

    getObject(key: string): JSONObject {
        const value = this.requestBody[key] as any;
        if (value == undefined)
            throw new BadRequestError(`'${key}' is a required field`);
        return new HonoJSONObject(value);
    }

    getObejectOptional(key: string): JSONObject | undefined {
        const value = this.requestBody[key] as any;
        if (value == undefined) return undefined;
        return this.getObject(key);
    }

    getObjectArray(key?: string): JSONObject[] {
        let values: any[];
        if (!key) values = this.requestBody as any[];
        else values = this.requestBody[key] as any[];
        if (values == undefined)
            throw new BadRequestError(`'${key}' is a required field`);
        const zod = z.array(z.any());
        const parseFailure = !zod.safeParse(values).success;
        if (parseFailure)
            throw new BadRequestError(`'${key}' must be an array`);
        return values.map((value) => new HonoJSONObject(value));
    }

    getObjectArrayOptional(key: string): JSONObject[] | undefined {
        const values = this.requestBody[key] as any[];
        if (values == undefined) return undefined;
        return this.getObjectArray(key);
    }
}

class HonoBedRequest implements BedRequest {
    private context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async getFormData(): Promise<FormData> {
        return await this.context.req.formData();
    }

    async getJSONBody(): Promise<JSONObject> {
        return new HonoJSONObject(await this.context.req.json());
    }

    getHeader(): BedHeaders {
        return new HonoHeaders(this.context);
    }
    getParams(): BedParams {
        return new HonoParams(this.context);
    }
}

export { HonoBedRequest };
