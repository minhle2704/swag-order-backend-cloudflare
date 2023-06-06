import bcrypt from "bcryptjs";

import { addRoute, RESPONSE_HEADERS } from "../helpers/routeHelpers.js";
import { faunaClient, Get, Index, Match } from "../helpers/faunaHelpers.js";

export const addRouteLogin = () =>
  addRoute("POST", "/login", async (request, response) => {
    try {
      const { username, password } = await request.body();
      const user = await faunaClient.query(
        Get(Match(Index("unique_username"), username))
      );
      if (user && bcrypt.compareSync(password, user.data.password)) {
        delete user.data.password;
        response.send(200, user.data, RESPONSE_HEADERS);
      } else {
        response.send(401, null, RESPONSE_HEADERS);
      }
    } catch (error) {
      response.send(500, error, RESPONSE_HEADERS);
    }
  });
