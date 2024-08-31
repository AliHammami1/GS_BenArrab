import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from 'src/Modeles/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  tab:Produit[]; // hethy ken froont
  constructor( private httpClient :HttpClient){}

  OnGet(): Observable < Produit[] >
  {
     return this.httpClient.get<Produit[]>('http://127.0.0.1:8000/api/produits');
  }

  OnSave(produitToSave:any): Observable<any> // return observable( thread) ( teba3 ll patron obdervable)
  {

    return this.httpClient.post('http://127.0.0.1:8000/api/produits',produitToSave);

  }

  OnDelate(id:string):Observable<any> // type de rotourn dima Observable
  {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/produits/${id}`);
  }

  getProduitById(id:string):Observable<Produit>
  {
    return this.httpClient.get<Produit>(`http://127.0.0.1:8000/api/produits/${id}`);
  }
  updateProduit(idp: string , produit : Produit ) : Observable < any >
  {
    return this.httpClient.put(`http://127.0.0.1:8000/api/produits/${idp}`,produit);
  }
  
  
  getProduitByLigneDep(id: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(`http://127.0.0.1:8000/api/produitbyLigneDep/${id}`);
 }
 

}

