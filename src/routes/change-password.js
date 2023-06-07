import bcrypt from "bcryptjs";

import { addRoute, RESPONSE_HEADERS } from "../helpers/routeHelpers.js";
import {
  faunaClient,
  Get,
  Index,
  Match,
  Update,
} from "../helpers/faunaHelpers.js";

export const addRouteChangePassword = () =>
  addRoute("POST", "/change-password", async (request, response) => {
    try {
      const { username, currentPassword, newPassword } = await request.body();
      const user = await faunaClient.query(
        Get(Match(Index("unique_username"), username))
      );
      if (bcrypt.compareSync(currentPassword, user.data.password)) {
        const salt = bcrypt.genSaltSync(10);
        await faunaClient.query(
          Update(user.ref, {
            data: {
              password: bcrypt.hashSync(newPassword, salt),
            },
          })
        );
        delete user.data.password;
        response.send(200, user.data, RESPONSE_HEADERS);
      } else {
        response.send(401, null, RESPONSE_HEADERS);
      }
    } catch (error) {
      response.send(500, error, RESPONSE_HEADERS);
    }
  });
