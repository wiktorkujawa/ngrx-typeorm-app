import {PostController} from "../controller/PostController";

export const postRoute = [{
    method: "get",
    route: "/posts",
    controller: PostController,
    action: "all"
}, 
{
    method: "get",
    route: "/posts/:id",
    controller: PostController,
    action: "one"
}, 
{
  method: "get",
  route: "/posts/image/:filename",
  controller: PostController,
  action: "displayImage"
}, 
{
    method: "post",
    route: "/posts",
    controller: PostController,
    action: "save"
}
, {
    method: "delete",
    route: "/posts/:id",
    controller: PostController,
    action: "remove"
}
];