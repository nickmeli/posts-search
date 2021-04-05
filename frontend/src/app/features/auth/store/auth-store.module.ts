import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey } from './auth.state';
import { AuthReducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';
import { AuthService } from '../auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, AuthReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthFacade,
    AuthService
  ]
})
export class AuthStoreModule { }
