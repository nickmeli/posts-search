import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthFacade } from 'src/app/features/auth/store/auth.facade';
import { PostsFacade } from '../../store/posts.facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  postFormGroup: FormGroup = this.formBuilder.group({
    postId: ''
  });
  _hasError: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private readonly postFacade: PostsFacade,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(this.postFacade.hasErrors$.subscribe((e: boolean) => {
      this._hasError = e;
    }));
  }

  getPost(): void {
    this.postFacade.loadPost(this.postFormGroup.value.postId);
  }

  get hasErrors(): boolean {
    return this._hasError;
  }

  get errorMessate(): string {
    return this.postFacade.getErrorMessage();
  }
}
