import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface ClientPrincipal {
  userDetails: string;
}
export interface AppUser {
  clientPrincipal: null | ClientPrincipal;
}

export interface UserData {
  username?: string;
  userId?: string;
  pending?: false;
}

export interface Pending {
  pending?: boolean;
  username?: never;
  userId?: never;
}

export type User = UserData | Pending | null;

const pendingUser: User = {
  pending: true
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject(pendingUser);

  constructor(private http: HttpClient) {
    this.http.get<AppUser>('.auth/me').subscribe(user => {
        this.user$.next(user.clientPrincipal ?
          {
            ...user.clientPrincipal,
            username: user.clientPrincipal.userDetails.split('@')[0]
          } :
          null);
      }
      , err => {
        this.user$.next(null);
      });
  }
}
