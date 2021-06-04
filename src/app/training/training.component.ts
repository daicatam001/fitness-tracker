import {Component, OnInit} from '@angular/core';
import {TrainingService} from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining$ = this.trainingService.exerciseChanged$;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
  }

}
