import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {selectExercises, startTraining} from '@training/store';
import {AppState} from '@store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTrainingComponent implements OnInit {
  exercises$ = this.store.pipe(select(selectExercises));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onStartTraining(form: NgForm): void {
    this.store.dispatch(startTraining({exerciseId: form.value.exercise}));
  }
}
