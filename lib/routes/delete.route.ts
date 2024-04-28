import BedRequest from "../request/bed-request";
import { BedResponse } from "../response/bed-response.builder";
import Route from "./route";

interface DELETERoute extends Route {
    DELETE(request: BedRequest): Promise<BedResponse>;
}

export default DELETERoute;
