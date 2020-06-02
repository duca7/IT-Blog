import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from 'firebase';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  user$: Observable<any>;

  checkCurrentUser() {
    return this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }



  async logOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData({ uid, email, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);
    const data = {
      uid,
      email,
      photoURL
    };
    return userRef.set(data, { merge: true });
  }

}

