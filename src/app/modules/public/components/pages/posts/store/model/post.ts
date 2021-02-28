export interface addPostModel {
  content: string,
  path: string,
  email: string,
  fileImage: boolean,
  files_id: string,
  files: any[]
}
export interface Post {
  id: string,
  content: string,
  path: string,
  email: string,
  fileImage: boolean,
  created_at: number,
  modified_at: number
}

// export type addPostModel = Omit<Post, "id"|"created_at"|"modified_at"|"files_id"|"email">