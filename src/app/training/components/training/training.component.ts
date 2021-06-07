import {Component, OnInit} from '@angular/core';
import {AppState} from '../../../store';
import {select, Store} from '@ngrx/store';
import {selectCurrentTraining, selectExercises} from '../../store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  currentTraining$ = this.store.pipe(select(selectCurrentTraining));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

}
