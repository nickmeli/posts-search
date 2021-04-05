import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postsFeatureKey } from './posts.state';
import { PostsReducer } from './posts.reducer';
import { PostsEffects } from './posts.effects';
import { PostsFacade } from './posts.facade';
import { PostsService } from '../posts.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(postsFeatureKey, PostsReducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [
    PostsFacade,
    PostsService
  ]
})
export class PostsStoreModule { }
