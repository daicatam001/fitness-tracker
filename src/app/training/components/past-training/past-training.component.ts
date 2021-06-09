import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppState} from '@store';
import {Store} from '@ngrx/store';
import {fetchFinishedExercises, selectFinishExercises} from '@training/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PastTrainingComponent implements OnInit {

  finishedTraining$ = this.store.select(selectFinishExercises);
  displayedColumns: string[] = ['name', 'progress', 'calories', 'state', 'date'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchFinishedExercises());
  }

}
