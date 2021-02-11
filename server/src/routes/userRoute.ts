import {UserController} from "../controller/UserController";

export const userRoute = [{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}, {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "register"
}, {
    method: "get",
    route: "/user",
    controller: UserController,
    action: "getUser"
}
, {
    method: "get",
    route: "/logout",
    controller: UserController,
    action: "logout"
}
];