import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { PostsActions } from ".";
import { Post } from "../../../../../../shared/schema/Post";
import { PostsInitialState, PostsState } from "./posts.state";


const postsReducer: ActionReducer<PostsState, Action> = createReducer(
  PostsInitialState,
  on(
    PostsActions.loadPost,
    (state: PostsState, ): PostsState => ({
      currentPost: undefined,
      hasErrors: false,
      errorMessage: ''
    })
  ),
  on(
    PostsActions.loadPostFailure,
    (state: PostsState, { e }: { e: any }): PostsState => ({
      currentPost: undefined,
      hasErrors: true,
      errorMessage: e.toString(),
    })
  ),
  on(
    PostsActions.loadPostSuccess,
    (state: PostsState, { post }: { post: Post }): PostsState => ({
      currentPost: post,
      hasErrors: false,
      errorMessage: ''
    })
  ),
);

export function PostsReducer(state: PostsState | undefined, action: Action): PostsState {
  return postsReducer(state, action);
}