import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, tap} from 'rxjs/operators';
import {Exercise, FinishedExercise} from '@training/training.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authState$ = this.afAuth.authState;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  signup(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(tap(res => console.log(res)));
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(tap(res => console.log(res)));
  }

  logout(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  getExercises(): Observable<Exercise[]> {
    return this.afs.collection<Exercise>('exercises')
      .snapshotChanges().pipe(
        map(docArray => {
          return docArray.map(doc => {
            const {name, duration, calories} = doc.payload.doc.data();
            return {id: doc.payload.doc.id, name, duration, calories};
          });
        }));
  }

  getFinishedExercise(): Observable<FinishedExercise[]> {
    return this.afs.collection<FinishedExercise>('finishedExercises').valueChanges();
  }

  saveFinishedExercise(exercise: FinishedExercise): void {
    this.afs.collection('finishedExercises').add(exercise);
  }
}
