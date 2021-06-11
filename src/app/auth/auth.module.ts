import {NgModule} from '@angular/core';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {AuthEffects, authReducer} from './store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '@shared/shared.module';
import {SignupComponent} from '@auth/components/signup/signup.component';
import {LoginComponent} from '@auth/components/login/login.component';
import {NotAuthGuard} from '@auth/guards/not-auth.guard';

const routes: Routes = [
  {path: 'signup', component: SignupComponent, canLoad: [NotAuthGuard], canActivate: [NotAuthGuard]},
  {path: 'login', component: LoginComponent, canLoad: [NotAuthGuard], canActivate: [NotAuthGuard]},
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    AngularFireStorageModule,
    MaterialModule
  ],
  providers: [NotAuthGuard]
})
export class AuthModule {

}
