import { CommentModel } from '../models/Comment';
import { Comment } from '@/shared/types';

export const getCommentsByPostId = async (postId: string, limit: number = 20): Promise<Comment[]> => {
  return await CommentModel.findByPostId(postId, limit);
};

export const createCommentService = async (
  userId: string,
  postId: string,
  content: string,
  parentId?: string
): Promise<Comment> => {
  return await CommentModel.create({
    userId,
    postId,
    content,
    parentId
  });
};

export const likeCommentService = async (id: string): Promise<void> => {
  await CommentModel.incrementLikes(id);
};

