import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { EMPTY, Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { PostsActions } from ".";
import { PostsService } from "../posts.service";
import { map } from 'rxjs/operators';
import { Post } from "../../../../../../shared/schema/Post";
import { Router } from "@angular/router";


@Injectable()
export class PostsEffects {
  loadPost$: Observable<Action>;
  loadPostFailure$: Observable<Action>;
  loadPostResponse$: Observable<Action>;
  loadPostSuccess$: Observable<Action>;

  constructor(
    private readonly actions$: Actions,
    private readonly postsApi: PostsService,
    private readonly router: Router,
  ) {
    this.loadPost$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PostsActions.loadPost),
        switchMap((data: { id: string }) =>
          this.postsApi.getPost(data.id).pipe(
            map((post: Post) => PostsActions.loadPostResponse({ post })),
            catchError((e: any) => of(PostsActions.loadPostFailure({ e }))),
          ),
        ),
      ),
    );

    this.loadPostFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PostsActions.loadPostFailure),
        switchMap((e : {e: any}) => {
          console.log('========= Post Error: ', e); // ToDo shwo notification
          return EMPTY;
        }),
      ),
      { dispatch: false }
    );

    this.loadPostResponse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PostsActions.loadPostResponse),
        switchMap((response: { post: Post }) => {
          if (!!response?.post?.title && !!response?.post?.body) {
            return of(PostsActions.loadPostSuccess({ post: response.post }));
          }
          else {
            return of(PostsActions.loadPostFailure({ e: 'Got broken post, try another post' }));
          }
        })
      ),
    );

    this.loadPostSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PostsActions.loadPostSuccess),
        switchMap(({ post: Post }) => {
          this.router.navigate(['/details']);
          return EMPTY;
        })
      ),
      { dispatch: false }
    );
  }
}