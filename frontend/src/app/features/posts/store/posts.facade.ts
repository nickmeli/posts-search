import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppState } from "src/app/core/store/app.state";
import { PostsActions } from ".";
import { Post } from "../../../../../../shared/schema/Post";
import { selectCurrentPost, selectErrorMessage, selectHasError } from "./posts.selectors";


@Injectable()
export class PostsFacade {
  currentPost$: Observable<Post | undefined>;
  hasErrors$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.currentPost$ = store.pipe(select(selectCurrentPost));
    this.hasErrors$ = store.pipe(select(selectHasError));
    this.errorMessage$ = store.pipe(select(selectErrorMessage));
  }

  loadPost(postId: string): void {
    this.store.dispatch(PostsActions.loadPost({ id: postId }));
  }

  getCurrentPost(): Post | undefined {
    let post: Post | undefined = undefined;

    this.currentPost$.pipe(take(1)).subscribe((p: Post | undefined) => post = p);
    return post;
  }

  getHasError(): boolean {
    let hasError: boolean = false;

    this.hasErrors$.pipe(take(1)).subscribe((e: boolean) => hasError = e);

    return hasError;
  }

  getErrorMessage(): string {
    let errorMessage: string = '';

    this.errorMessage$.pipe(take(1)).subscribe((e: string) => errorMessage = e);

    return errorMessage;
  }
}