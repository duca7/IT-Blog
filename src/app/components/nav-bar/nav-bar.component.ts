import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  avt = '';
  constructor(
    public router: Router,
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      if (!user.emailVerified) {
        user.sendEmailVerification().then(() => {
          this.snackBar.open('Welcome', 'OK', {duration: 5000});
        }).catch((err) => {
          this.snackBar.open(err, 'OK', {duration: 5000});
        });
      }
      this.avt = user.photoURL;
    });
  }

  signout(){
    return this.afAuth.signOut().then(() =>{
      this.router.navigate(['Home']);
    })
  }


}
