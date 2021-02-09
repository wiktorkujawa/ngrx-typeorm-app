export interface Post {
  id: string,
  subject: string,
  content: string
}

export type addPostModel = Omit<Post, "id">
