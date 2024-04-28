import BedRequest from "../request/bed-request";
import BedResponse from "../response/bed-response";
import Route from "./route";

interface POSTRoute extends Route {
    POST(request: BedRequest): Promise<BedResponse>;
}

export default POSTRoute;
