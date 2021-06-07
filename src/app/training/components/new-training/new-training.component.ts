import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppState} from '../../../store';
import {select, Store} from '@ngrx/store';
import {fetchExercises, selectExercises} from '../../store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$ = this.store.pipe(select(selectExercises));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchExercises());
  }

  onStartTraining(form: NgForm): void {
  }
}
