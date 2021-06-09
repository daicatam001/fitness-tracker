export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;

}


export interface ExerciseEntities {
  [key: string]: Exercise;
}

export interface CurrentTraining extends Partial<Exercise> {
  exerciseId: string;
  progress: number;
}

export interface FinishedExercise extends Exercise {
  date: string;
  state: 'completed' | 'cancelled' | null;
}
