import { PostModel } from '../models/Post';
import { Post } from '@/shared/types';

export const getPostsService = async (limit: number = 20, offset: number = 0): Promise<Post[]> => {
  return await PostModel.findAll(limit, offset);
};

export const getPostById = async (id: string): Promise<Post | null> => {
  return await PostModel.findById(id);
};

export const getPostsByUserId = async (userId: string, limit: number = 20): Promise<Post[]> => {
  return await PostModel.findByUserId(userId, limit);
};

export const createPostService = async (userId: string, content: string, mediaUrls: string[] = []): Promise<Post> => {
  return await PostModel.create({
    userId,
    content,
    mediaUrls
  });
};

export const updatePostService = async (id: string, content: string): Promise<Post | null> => {
  return await PostModel.update(id, content);
};

export const deletePostService = async (id: string): Promise<boolean> => {
  return await PostModel.delete(id);
};

export const likePostService = async (id: string): Promise<void> => {
  await PostModel.incrementLikes(id);
};

export const unlikePostService = async (id: string): Promise<void> => {
  await PostModel.decrementLikes(id);
};

