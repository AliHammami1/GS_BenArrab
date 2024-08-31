import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/Services/produit.service';
import { UserService } from 'src/Services/user.service';
import { DatePipe } from '@angular/common';
import { DepotService } from 'src/Services/depot.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    DatePipe // Ajoutez DatePipe aux fournisseurs du module
  ]
})
export class DashboardComponent implements OnInit {
  dateAujourdui!:Date;

  nbuserConf: number=0;

  nbprodconf: number=0;
  nbvendeur: number=0;

  nbCategiorieNONArch: number=0;


  OnLoud1:boolean=true;

  OnLoud4:boolean=true;

  OnLoud7:boolean=true;




  constructor(private US : UserService, private PS : ProduitService,private DS : DepotService,private datePipe: DatePipe) {this.dateAujourdui=new Date(); }

  ngOnInit(): void {

    this.US.OnGet().subscribe(data => {
      if(data===null)
      {
        this.nbuserConf=0;
      }
      else{
        this.nbuserConf=data.length;
      }
      console.log("prod arch conf "+this.nbuserConf);
      this.OnLoud1=true;

    });

    this.DS.OnGet().subscribe(data => {
      if(data===null)
      {
        this.nbCategiorieNONArch=0;
      }
      else{
        this.nbCategiorieNONArch=data.length;
      }
      console.log("prod cat conf "+this.nbCategiorieNONArch);
      this.OnLoud4=true;

    });
    
    this.PS.OnGet().subscribe(data => {
      if(data===null)
      {
        this.nbprodconf=0;
      }
      else{
        this.nbprodconf=data.length;
      }
      console.log("prodconf "+this.nbprodconf);
      this.OnLoud7=true;

    });
    
  }

}
