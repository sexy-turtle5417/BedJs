import BedHeaders from "./bed-headers";
import JSONObject from "./json-object";
import BedParams from "./request-params";

interface BedRequest {
    getFormData(): Promise<FormData>;
    getJSONBody(): Promise<JSONObject>;
    getHeader(): BedHeaders;
    getParams(): BedParams;
}

export default BedRequest;
