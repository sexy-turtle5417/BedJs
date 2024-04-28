import { Hono } from "hono";
import HonoBed from "../lib/hono-bed/hono-bed";

const bed = new HonoBed(new Hono());

bed.rest();
