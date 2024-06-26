import BedRequest from "../request/bed-request";
import BedResponse from "../response/bed-response";
import Route from "./route";

interface PUTRoute extends Route {
    PUT(request: BedRequest): Promise<BedResponse>;
}

export default PUTRoute;
