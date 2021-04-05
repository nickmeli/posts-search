import { createAction, props } from "@ngrx/store";
import { Post } from '../../../../../../shared/schema/Post';


export const loadPost = createAction('[Posts/API] load post', props<{ id: string }>());
export const loadPostFailure = createAction('[Posts/API] load post failure', props<{ e: any }>());
export const loadPostResponse = createAction('[Posts/API] load post response', props<{ post: Post }>());
export const loadPostSuccess = createAction('[Posts/API] load post success', props<{ post: Post }>());
