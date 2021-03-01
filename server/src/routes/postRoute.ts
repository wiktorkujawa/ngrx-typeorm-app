import { PostController } from '../controller/PostController';

export const postRoute = [
  {
    method: 'get',
    route: '/api/posts',
    controller: PostController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/posts/:id',
    controller: PostController,
    action: 'one',
  },
  {
    method: 'get',
    route: '/api/posts/image/:filename',
    controller: PostController,
    action: 'displayImage',
  },
  {
    method: 'put',
    route: '/api/posts/update/:id',
    controller: PostController,
    action: 'update'
  },
  {
    method: 'post',
    route: '/api/posts',
    controller: PostController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/posts/:id',
    controller: PostController,
    action: 'remove',
  },
];
