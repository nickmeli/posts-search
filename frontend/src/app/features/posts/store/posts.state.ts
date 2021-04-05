import { Post } from '../../../../../../shared/schema/Post';

export const postsFeatureKey: 'posts' = 'posts';

export interface PostsState {
  currentPost: Post | undefined;
  hasErrors: boolean;
  errorMessage: string;
}

export const PostsInitialState: PostsState = {
  currentPost: undefined,
  hasErrors: false,
  errorMessage: ''
};