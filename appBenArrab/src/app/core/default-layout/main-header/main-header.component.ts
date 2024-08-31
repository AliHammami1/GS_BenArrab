import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/Services/produit.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  nbtotal: number = 0;
  nbproduit: number = 0;
  nbacheteur: number = 0;
  constructor(private US : UserService, private PS : ProduitService) {


  }
  ngOnInit(): void {
    /*this.US.OnGetNotifUser().subscribe(data => {
      this.nbacheteur = data;
      //this.nbtotal+=data;
    });
    this.PS.OnGetNotification().subscribe(data => {
      this.nbproduit = data;
      this.nbtotal+=data;
    });*/
    console.log(this.nbtotal);
    console.log(this.nbproduit);
    console.log(this.nbacheteur);


  }

}
