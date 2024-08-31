import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ActivatedRoute } from '@angular/router';
import { DepotService } from 'src/Services/depot.service';
import { LignedepService } from 'src/Services/lignedep.service';
import { Depot } from 'src/Modeles/Depot';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LigneDep } from 'src/Modeles/LigneDep';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ligne-dep',
  templateUrl: './ligne-dep.component.html',
  styleUrls: ['./ligne-dep.component.css']
})
export class LigneDepComponent implements OnInit {
  idcourant!:string
  NomDep!:string
  OnLoud:boolean=false;
  OnLoud1:boolean=false;
  constructor(private _liveAnnouncer: LiveAnnouncer,private activatedRoute:ActivatedRoute,private DS:DepotService,private LDS:LignedepService,private viewContainer: ViewContainerRef){
  }
  errors: any = [];
  formError: any = {};
  isFocused: boolean = false;// pour les errors de form

  dataa!:Depot
  LigneDepForm = new FormGroup({
    nomlignedep: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {

    this.idcourant=this.activatedRoute.snapshot.params['id'] ;
    // console.log(this.idcourant)
    if(!!this.idcourant) // !! hethoum ye9esdo bihom "troli" ma3neha ken idcourant mawjoud men asslo wala ma3neha différent undifined
    {
      this.getLigneDep();
      this.DS.getDepotById(this.idcourant).subscribe((result)=>{
        this.dataa=result;
        this.NomDep=this.dataa.nomdepot;
        console.log(this.NomDep)
        this.OnLoud1=true;
      })

    }

  }
  datasource =new MatTableDataSource<LigneDep>();
  displayedColumns: string[] = ['id','nomlignedep','action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('closeModal') closeModal: ElementRef


  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  getLigneDep(){
    this.LDS.getLigneDepByDepot(this.idcourant).subscribe((r)=>{
      //this.datasource.data=r;
      this.datasource = new MatTableDataSource<LigneDep>(r);
      this.OnLoud=true;
    })
  }

  validForm() { // controle form
    this.errors = [];
    this.formError = {};
    let validFlag = true;
    if (!this.LigneDepForm.value.nomlignedep) {
      this.errors.push('nom');
      this.formError.errorFornom = 'il faux remplire le nom  de la ligne depôt';
      validFlag = false;
    }
    return validFlag;
  }
  // clearError() {
  //   // Cette méthode est appelée à chaque saisie dans l'input
  //   const index = this.errors.indexOf('nom');
  //   if (index > -1) {
  //     this.errors.splice(index, 1);
  //     this.formError.errorFornom = '';
  //   }
  // }
  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    this.checkError();
  }

  clearError() {
    const index = this.errors.indexOf('nom');
    if (index > -1) {
      this.errors.splice(index, 1);
      this.formError.errorFornom = '';
    }
  }

  checkError() {
    if (!this.validForm() && !this.isFocused) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.errors.push('nom');
      this.formError.errorFornom = 'Il faut remplir le nom de la ligne depôt';
    }
  }
  onsub(){
    // console.log(this.CategorieForm.value.nomCat)

    if (!this.validForm()) {
      return
    }
    let myDictionary = {
      depotID: this.idcourant,
      nomlignedep: this.LigneDepForm.value.nomlignedep,
      // Ajoutez d'autres paires clé-valeur au besoin
  };
    console.log(myDictionary)
    console.log(this.LigneDepForm.value)
    this.LDS.OnSave(myDictionary).subscribe(()=> {
      this.getLigneDep();

      Swal.fire({
        title: '',
        text: 'Ajout Avec succes',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) { // Vérifie si l'utilisateur a cliqué sur le bouton de confirmation
          location.reload();
          this.getLigneDep();
        }
      });



    });
  }
  closeModalAndResetForm() {
    this.LigneDepForm.reset(); // Réinitialiser le formulaire
    this.closeModal.nativeElement.click(); // Fermer le modal

  }

}
