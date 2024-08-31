import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/Modeles/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tab:User[]; // hethy ken froont
  constructor( private httpClient :HttpClient){}

  OnGet(): Observable < User[] >
  {
     return this.httpClient.get<User[]>('http://127.0.0.1:8000/api/users');
  }

  OnSave(userToSave:any): Observable<any> // return observable( thread) ( teba3 ll patron obdervable)
  {

    return this.httpClient.post('http://127.0.0.1:8000/api/register',userToSave);

  }

  OnDelate(id:string):Observable<any> // type de rotourn dima Observable
  {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/users/${id}`);
  }

  getUserById(id:string):Observable<User>
  {
    return this.httpClient.get<User>(`http://127.0.0.1:8000/api/users/${id}`);
  }
  updateUser(idc: string , user : User ) : Observable < any >
  {
    return this.httpClient.put(`http://127.0.0.1:8000/api/users/${idc}`,user);
  }

  getUserByEmail(email:string):Observable<User>
  {
    return this.httpClient.get<User>(`http://127.0.0.1:8000/api/rechercheParMail/${email}`);
  }
  
}

