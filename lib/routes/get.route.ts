import BedRequest from "../request/bed-request";
import BedResponse from "../response/bed-response.builder";
import Route from "./route";

interface GETRoute extends Route {
    GET(request: BedRequest): Promise<BedResponse>;
}

export default GETRoute;
