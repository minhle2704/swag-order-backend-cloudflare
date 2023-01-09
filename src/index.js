import { listen } from "worktop";

import { router } from "./helpers/routeHelpers.js";
import { addRouteLogin } from "./routes/login.js";

addRouteLogin();

listen(router.run);
