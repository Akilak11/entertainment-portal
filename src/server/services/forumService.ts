import { ForumModel } from '../models/Forum';
import { ForumTopicModel } from '../models/ForumTopic';

export const getForumsService = async () => {
  return await ForumModel.getForums();
};

export const getForumById = async (id: string) => {
  return await ForumModel.getForumById(id);
};

export const createForumService = async (name: string, description: string) => {
  return await ForumModel.createForum(name, description);
};

export const getTopicsByForum = async (forumId: string, limit: number = 20) => {
  return await ForumTopicModel.getTopicsByForum(forumId, limit);
};

export const getTopicById = async (id: string) => {
  return await ForumTopicModel.getTopicById(id);
};

export const createTopicService = async (
  forumId: string,
  userId: string,
  title: string,
  content: string
) => {
  return await ForumTopicModel.createTopic({
    forumId,
    userId,
    title,
    content
  });
};

export const incrementTopicViews = async (id: string) => {
  await ForumTopicModel.incrementViews(id);
};
