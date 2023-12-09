import axios from 'axios';
import { Post, PostWithCommentCount } from '../models/Post';

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export const fetchCommentsForPost = async (postId: number): Promise<any[]> => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return data;
};

export const getPostsWithCommentCounts = async (): Promise<PostWithCommentCount[]> => {
  const posts = await fetchPosts();
  const postsWithComments = await Promise.all(
    posts.map(async post => {
      const comments = await fetchCommentsForPost(post.id);
      return { ...post, commentCount: comments.length };
    })
  );
  return postsWithComments;
};
