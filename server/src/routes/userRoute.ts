import {UserController} from "../controller/UserController";

export const userRoute = [{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
  }, 
  {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "register"
  },
  {
    method: "get",
    route: "/account/active/:activeToken",
    controller: UserController,
    action: "activateAccount"
  },  
  {
    method: "get",
    route: "/user",
    controller: UserController,
    action: "getUser"
  }, 
  {
    method: "get",
    route: "/logout",
    controller: UserController,
    action: "logout"
  },
  {
    method: "get",
    route: "/auth/google",
    controller: UserController,
    action: "googleAuth"
  },
  {
    method: "get",
    route: "/auth/google/callback",
    controller: UserController,
    action: "googleCallback"
  },
];