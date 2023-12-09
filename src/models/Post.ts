export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithCommentCount extends Post {
  commentCount: number;
}
