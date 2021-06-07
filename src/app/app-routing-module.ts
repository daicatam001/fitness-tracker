import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGuard} from './auth';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then(m => m.TrainingModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
