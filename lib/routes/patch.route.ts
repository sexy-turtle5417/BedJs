import BedRequest from "../request/bed-request";
import BedResponse from "../response/bed-response.builder";
import Route from "./route";

interface PATCHRoute extends Route {
    PATCH(request: BedRequest): Promise<BedResponse>;
}

export default PATCHRoute;
