import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {Exercise} from '../../training/training.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {

  }


  signup(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
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
}
