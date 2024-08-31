import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../app/core/shared/utils/api-handler.service';
import { API_ENDPOINTS, ApiMethod } from '../app/core/shared/utils/const';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  constructor( private httpClient :HttpClient) {}
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  signIn(data: any) :Observable<any> {
    this.loggedIn = true;
    return this.httpClient.post<any>('http://127.0.01:8000/api/login',data);
  }

  logout() :Observable<any> {
    localStorage.clear();
    this.loggedIn = false;
    return this.httpClient.post<any>('http://127.0.0.1:8000/api/logout',null);

  }




}
