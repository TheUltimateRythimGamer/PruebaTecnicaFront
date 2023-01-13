import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private user: UserService,
        private router: Router
    ) { }

    canActivate() {
        if (!this.user.isLoggedIn()) {
            // if (true) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}