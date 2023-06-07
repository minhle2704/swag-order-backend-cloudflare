import { listen } from "worktop";

import { router } from "./helpers/routeHelpers.js";
import { addRouteLogin } from "./routes/login.js";
import { addRouteSignUp } from "./routes/sign-up.js";
import { addRouteChangePassword } from "./routes/change-password.js";

addRouteLogin();
addRouteSignUp();
addRouteChangePassword();

listen(router.run);
