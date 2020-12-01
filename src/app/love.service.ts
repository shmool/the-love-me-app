import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface LikesRes {
  likes: number;
  userLikes?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoveService {
  likes$ = new BehaviorSubject({ likes: 0 });

  constructor(private http: HttpClient) {
    this.http.get<LikesRes>(`${ environment.endpoint }/api/likes`).subscribe(likes => {
      this.likes$.next(likes);
    });
  }

  like(): void {
    this.http.post<LikesRes>(`${ environment.endpoint }/api/like`, { like: true }).subscribe(res => {
      this.likes$.next(res);
    });
  }
}
