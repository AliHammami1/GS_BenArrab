import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depot } from 'src/Modeles/Depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor( private httpClient :HttpClient){}

  OnGet(): Observable < Depot[] >
  {
     return this.httpClient.get<Depot[]>('http://127.0.0.1:8000/api/depots');
  }

  OnSave(depotToSave:any): Observable<void> // return observable( thread) ( teba3 ll patron obdervable)
  {

    return this.httpClient.post<void>('http://127.0.0.1:8000/api/depots',depotToSave);

  }


  getDepotById(id:string):Observable<Depot>
  {
    return this.httpClient.get<Depot>(`http://127.0.0.1:8000/api/depots/${id}`);
  }

  updateDepot(idc: string , depot : Depot ) : Observable < any >
  {
    return this.httpClient.put(`http://127.0.0.1:8000/api/depots/${idc}`,depot);
  }
}

