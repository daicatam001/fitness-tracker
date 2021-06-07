import {NgModule} from '@angular/core';
import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingComponent} from './past-training/past-training.component';
import {MaterialModule} from '../material.module';
import {SharedModule} from '../shared/shared.module';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: TrainingComponent}
];

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TrainingModule {

}
