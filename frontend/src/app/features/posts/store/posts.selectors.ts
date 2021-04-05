import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { AppState } from "src/app/core/store/app.state";
import { Post } from "../../../../../../shared/schema/Post";
import { postsFeatureKey, PostsState } from "./posts.state";


export const selectPostsState: MemoizedSelector<AppState, PostsState> = createFeatureSelector<PostsState>(postsFeatureKey);

export const selectCurrentPost: MemoizedSelector<AppState, Post | undefined> = createSelector(
  selectPostsState,
  (state: PostsState) => state.currentPost,
);

export const selectHasError: MemoizedSelector<AppState, boolean> = createSelector(
  selectPostsState,
  (state: PostsState) => state.hasErrors,
);

export const selectErrorMessage: MemoizedSelector<AppState, string> = createSelector(
  selectPostsState,
  (state: PostsState) => state.errorMessage,
);