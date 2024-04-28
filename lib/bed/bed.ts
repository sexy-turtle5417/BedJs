import POSTRoute from "../routes/post.route";
import GETRoute from "../routes/get.route";
import PUTRoute from "../routes/put.route";
import PATCHRoute from "../routes/patch.route";
import DELETERoute from "../routes/delete.route";

interface Bed {
    mountPOSTRoute(route: POSTRoute): void;
    mountGETRoute(route: GETRoute): void;
    mountPUTRoute(route: PUTRoute): void;
    mountPATCHRoute(route: PATCHRoute): void;
    mountDELETERoute(route: DELETERoute): void;
    rest(): void;
}

export default Bed;
