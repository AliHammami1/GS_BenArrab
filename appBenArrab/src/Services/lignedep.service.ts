import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LigneDep } from 'src/Modeles/LigneDep';

@Injectable({
  providedIn: 'root'
})
export class LignedepService {

  constructor( private httpClient :HttpClient){}
  OnGet(): Observable < LigneDep[] >
  {
     return this.httpClient.get<LigneDep[]>(`http://127.0.0.1:8000/api/lignedeps`);
  }
  OnSave(LignedepToSave:any): Observable<void> // return observable( thread) ( teba3 ll patron obdervable)
  {

    return this.httpClient.post<void>('http://127.0.0.1:8000/api/lignedeps',LignedepToSave);
  }

  getLigneDepById(id:string):Observable<LigneDep>
  {
    return this.httpClient.get<LigneDep>(`http://127.0.0.1:8000/api/lignedeps/${id}`);
  }

  getLigneDepByDepot(id:string):Observable<LigneDep[]>
  {
    return this.httpClient.get<LigneDep[]>(`http://127.0.0.1:8000/api/LigneDep/${id}`);
  }
}
