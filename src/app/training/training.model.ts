export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}


export interface ExerciseEntities {
  [key: string]: Exercise;
}

export interface CurrentTraining {
  exerciseId: string;
  progress: number;
}
