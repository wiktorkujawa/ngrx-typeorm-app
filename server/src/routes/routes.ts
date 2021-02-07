import { postRoute } from "./postRoute";
import { userRoute } from "./userRoute";

export const Routes = [
  ...userRoute, 
  ...postRoute
];