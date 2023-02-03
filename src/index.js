import { listen } from "worktop";

import { router } from "./helpers/routeHelpers.js";
import { addRouteLogin } from "./routes/login.js";
import { addRouteSignUp } from "./routes/sign-up.js";

addRouteLogin();
addRouteSignUp();

listen(router.run);
