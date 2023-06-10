import { addRoute, RESPONSE_HEADERS } from "../helpers/routeHelpers.js";
import {
  faunaClient,
  Collection,
  Documents,
  Get,
  Lambda,
  Map,
  Paginate,
  Var,
} from "../helpers/faunaHelpers.js";

export const addRouteSwags = () =>
  addRoute("GET", "/swags", async (request, response) => {
    try {
      const result = await faunaClient.query(
        Map(
          Paginate(Documents(Collection("Swags"))),
          Lambda("ref", Get(Var("ref")))
        )
      );

      const swags = result.data.map(({ data }) => data);

      response.send(200, swags, RESPONSE_HEADERS);
    } catch (error) {
      response.send(500, error, RESPONSE_HEADERS);
    }
  });
