import { Router } from "worktop";

export const router = new Router();

export const addRoute = (method, path, func) => {
  router.add(method, path, func);

  router.add("OPTIONS", path, async (request, response) => {
    response.send(200, null, RESPONSE_HEADERS);
  });
};

export const RESPONSE_HEADERS = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": [ORIGIN],
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};
