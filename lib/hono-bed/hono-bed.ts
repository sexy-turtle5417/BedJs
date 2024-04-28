import { Hono } from "hono";
import { HonoBedRequest } from "../hono-bed-request/hono-bed.request";
import Bed from "../bed/bed";
import DELETERoute from "../routes/delete.route";
import GETRoute from "../routes/get.route";
import PATCHRoute from "../routes/patch.route";
import POSTRoute from "../routes/post.route";
import PUTRoute from "../routes/put.route";
import { serve } from "@hono/node-server";
import { Context } from "hono";
import HttpError from "../errors/http.error";

class HonoBed implements Bed {
    private hono: Hono;

    private postRoutes: POSTRoute[] = [];
    private getRoutes: GETRoute[] = [];
    private putRoutes: PUTRoute[] = [];
    private patchRoutes: PATCHRoute[] = [];
    private deleteRoutes: DELETERoute[] = [];

    constructor(hono: Hono) {
        this.hono = hono;
    }

    private initializePOSTRoutes(): void {
        console.log("mounting POST routes");
        if (this.postRoutes.length < 1) console.log("no POST routes to mount");
        this.postRoutes.forEach((route) => {
            this.hono.post(route.getURI(), async (context: Context) => {
                const response = await route.POST(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(`successfully mounted POST: ${route.getURI()}`);
        });
    }

    private initializeGETRoutes(): void {
        console.log("mounting GET routes");
        if (this.getRoutes.length < 1) console.log("no GET routes to mount");
        this.getRoutes.forEach((route) => {
            this.hono.get(route.getURI(), async (context: Context) => {
                const response = await route.GET(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(`successfully mounted GET: ${route.getURI()}`);
        });
    }

    private initializePUTRoutes(): void {
        console.log("mounting PUT routes");
        if (this.putRoutes.length < 1) console.log("no PUT routes to mount");
        this.putRoutes.forEach((route) => {
            this.hono.put(route.getURI(), async (context: Context) => {
                const response = await route.PUT(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(`successfully mounted PUT: ${route.getURI()}`);
        });
    }

    private initializePATCHRoutes(): void {
        console.log("mounting PATCH routes");
        if (this.patchRoutes.length < 1)
            console.log("no PATCH routes to mount");
        this.patchRoutes.forEach((route) => {
            this.hono.patch(route.getURI(), async (context: Context) => {
                const response = await route.PATCH(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(`successfully mounted PATCH: ${route.getURI()}`);
        });
    }

    private initializeDELETERoutes(): void {
        console.log("mounting DELETE routes");
        if (this.deleteRoutes.length < 1)
            console.log("no DELETE routes to mount");
        this.deleteRoutes.forEach((route) => {
            this.hono.delete(route.getURI(), async (context: Context) => {
                const response = await route.DELETE(
                    new HonoBedRequest(context)
                );
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
        });
    }

    private initializeErrorHandling(): void {
        this.hono.onError((error: Error, context: Context) => {
            if (error instanceof HttpError) return error.handle(context);
            context.status(500);
            console.error(error);
            return context.json({ message: "server error" });
        });
    }

    mountPOSTRoute(route: POSTRoute): void {
        this.postRoutes.push(route);
    }

    mountGETRoute(route: GETRoute): void {
        this.getRoutes.push(route);
    }

    mountPUTRoute(route: PUTRoute): void {
        this.putRoutes.push(route);
    }

    mountPATCHRoute(route: PATCHRoute): void {
        this.patchRoutes.push(route);
    }

    mountDELETERoute(route: DELETERoute): void {
        this.deleteRoutes.push(route);
    }

    rest(): void {
        this.initializePOSTRoutes();
        this.initializeGETRoutes();
        this.initializePUTRoutes();
        this.initializePATCHRoutes();
        this.initializeDELETERoutes();
        this.initializeErrorHandling();
        serve(this.hono, () => console.log("server started on port 3000"));
    }
}

export default HonoBed;
