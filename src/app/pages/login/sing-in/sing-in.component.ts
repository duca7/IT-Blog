
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { SingUpComponent } from './../sing-up/sing-up.component';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar,
    public auth : AuthService,
    public router: Router,
  ) { }



  hide= true;
  ngOnInit(): void {}
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a password' :
        this.password.hasError('minLength') ? 'You password must have 8 characters' :
          '';
  }


  loginOnClick() {
    this.dialog.open(SingUpComponent,{
      width: '30%',
      height: '60%'
    });
}

  signin() {
    this.afAuth.signInWithEmailAndPassword(this.email.value, this.password.value).then(() => {
      this.snackBar.open('Success!', 'OK', {duration: 2000});
    }).catch((err) => {
      this.snackBar.open(err, 'OK', {duration: 2000});
    });

  }

  loginWithGG() {
    this.auth.loginWithGG().then(()=>{
      this.router.navigate(['Home']);
    });
 }

}
