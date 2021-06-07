import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing-module';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './naviagtion/header/header.component';
import {SidenavListComponent} from './naviagtion/sidenav-list/sidenav-list.component';
import {StopTrainingComponent} from './training/current-training/stop-training.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {SharedModule} from './shared/shared.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {StoreModule} from '@ngrx/store';
import {AuthGuard, AuthModule} from './auth';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent],
})
export class AppModule {
}
