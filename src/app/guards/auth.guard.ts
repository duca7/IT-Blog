import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map<firebase.User, boolean>((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['/blog']);
        return false;
      })
    );
  }


}
