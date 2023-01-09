import { addRoute, RESPONSE_HEADERS } from "../helpers/routeHelpers.js";
import {
  faunaClient,
  Get,
  Index,
  Lambda,
  Map,
  Match,
  Paginate,
  Var,
} from "../helpers/faunaHelpers.js";

export const addRouteLogin = () =>
  addRoute("POST", "/login", async (request, response) => {
    try {
      const { username, password } = await request.body();

      const result = (
        await faunaClient.query(
          Map(
            Paginate(Match(Index("username-password"), [username, password])),
            Lambda("userRef", Get(Var("userRef")))
          )
        )
      ).data;

      if (result.length) {
        response.send(200, result[0].data, RESPONSE_HEADERS);
      } else {
        response.send(401, null, RESPONSE_HEADERS);
      }
    } catch (error) {
      response.send(500, error, RESPONSE_HEADERS);
    }
  });
