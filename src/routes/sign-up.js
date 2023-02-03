import bcrypt from "bcryptjs";

import { addRoute, RESPONSE_HEADERS } from "../helpers/routeHelpers.js";
import {
  Collection,
  Create,
  Exists,
  faunaClient,
  If,
  Index,
  Match,
  Or,
} from "../helpers/faunaHelpers.js";

export const addRouteSignUp = () =>
  addRoute("POST", "/sign-up", async (request, response) => {
    try {
      const { firstName, lastName, email, username, password } =
        await request.body();
      const salt = bcrypt.genSaltSync(10);
      const result = await faunaClient.query(
        If(
          Or(
            Exists(Match(Index("unique_username"), username)),
            Exists(Match(Index("unique_email"), email))
          ),
          null,
          Create(Collection("User"), {
            data: {
              firstName,
              lastName,
              email,
              username,
              password: bcrypt.hashSync(password, salt),
              orders: [],
              role: "user",
            },
          })
        )
      );

      if (result) {
        response.send(200, result.data, RESPONSE_HEADERS);
      } else {
        response.send(401, null, RESPONSE_HEADERS);
      }
    } catch (error) {
      response.send(500, error, RESPONSE_HEADERS);
    }
  });
