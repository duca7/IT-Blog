import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid:string = "";
  user:User = {
    email : '',
    name: '',
    photourl: '',
  }
  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar,
  ) { }

  async loginWithGG() {
    const provider = await new auth.GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider).then((u) => {
      this.login();
      this.snackBar.open('Success!', 'OK', {duration: 2000});
      console.log(u.user);
      this.uid=u.user.uid;
        this.user.email=u.user.email;
        this.user.name=u.user.displayName;
        this.user.photourl=u.user.photoURL;
        if(!this.checkuser(u.user.uid))
        {
          this.addNewUser();
        }
    }).catch((err) =>{
      this.snackBar.open(err,'OK', {duration: 2000})
    });
  }

  checkuser(uid:string): boolean{
    this.db.collection('users').doc(uid).get().subscribe((data)=>{
      if(data.exists)
      {
        return true;
      }
      else return false;
    });
    return false;
  }
  addNewUser()
  {
    this.db.collection("users").doc(this.uid).set(this.user);

  }


  fetch(){
    //this.db.collection("users").doc(this.uid).get()
    this.db.collection("users").doc(this.uid).get()
  }

  isLoggedin = false;

    login() {
        this.isLoggedin = true;
    }

    logout() {
        this.isLoggedin = false;
    }

}

interface User{
  email:string,
  name:string,
  photourl:string,
}
