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
import chalk from "chalk";

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
        this.postRoutes.forEach((route) => {
            this.hono.post(route.getURI(), async (context: Context) => {
                const response = await route.POST(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(chalk.bgYellow("POST:"), `${route.getURI()}`);
        });
    }

    private initializeGETRoutes(): void {
        this.getRoutes.forEach((route) => {
            this.hono.get(route.getURI(), async (context: Context) => {
                const response = await route.GET(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(chalk.bgGreen("GET:"), `${route.getURI()}`);
        });
    }

    private initializePUTRoutes(): void {
        this.putRoutes.forEach((route) => {
            this.hono.put(route.getURI(), async (context: Context) => {
                const response = await route.PUT(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(chalk.bgCyan("PUT:"), `${route.getURI()}`);
        });
    }

    private initializePATCHRoutes(): void {
        this.patchRoutes.forEach((route) => {
            this.hono.patch(route.getURI(), async (context: Context) => {
                const response = await route.PATCH(new HonoBedRequest(context));
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(chalk.bgBlue("PATCH:"), `${route.getURI()}`);
        });
    }

    private initializeDELETERoutes(): void {
        this.deleteRoutes.forEach((route) => {
            this.hono.delete(route.getURI(), async (context: Context) => {
                const response = await route.DELETE(
                    new HonoBedRequest(context)
                );
                context.status(response.getStatusCode());
                return context.json(response.getBody());
            });
            console.log(chalk.bgRed("DELETE:"), `${route.getURI()}`);
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
        console.log("Routes mounted:");
        console.log();
        this.initializePOSTRoutes();
        this.initializeGETRoutes();
        this.initializePUTRoutes();
        this.initializePATCHRoutes();
        this.initializeDELETERoutes();
        this.initializeErrorHandling();
        console.log();
        serve(this.hono, () => console.log("Server started on port 3000"));
    }
}

export default HonoBed;
