import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitService } from 'src/Services/produit.service';
import { Produit } from 'src/Modeles/Produit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Depot } from 'src/Modeles/Depot';
import { DepotService } from 'src/Services/depot.service';
import { LignedepService } from 'src/Services/lignedep.service';
import { LigneDep } from 'src/Modeles/LigneDep';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  dateAujourdhui!: Date;
  constructor(private PS:ProduitService, private DS:DepotService,private LDS:LignedepService){
    this.dateAujourdhui = new Date();
  }
  datasource =new MatTableDataSource<Produit>();
  displayedColumns: string[] = ['date','qualiter', 'grammage', 'type','poids','action'];
  maxPrixEnchere: number = 0;
  OnLoud:boolean=false;
  QualiterErrors: any = [];
  formQualiterError: any = {};

  DateErrors: any = [];
  formDateError: any = {};

  GrammageErrors: any = [];
  formGrammageError: any = {};

  PoidsErrors: any = [];
  formPoidsError: any = {};

  TypeErrors: any = [];
  formTypeError: any = {};

  DepotErrors: any = [];
  formDepotError: any = {};

  LigneErrors: any = [];
  formLigneError: any = {};
  depot!: Depot[];
  dataLD!:LigneDep[];

  ProduitForm!:FormGroup
  //idparcour:number =0;
  isFocusedQualite: boolean = false;// pour les errors de form
  isFocusedDate: boolean = false;
  isFocusedGrammage: boolean = false;
  isFocusedPoids: boolean = false;
  isFocusedType: boolean = false;
  isFocusedDepot: boolean = false;
  isFocusedLigne: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('closeModal') closeModal: ElementRef

  ngOnInit(): void {
    this.getProduit();
    this.getDepot();
    this.initForm();
  }

  initForm(): void
   {
     this.ProduitForm=new FormGroup({
       qualiter: new FormControl(null,[Validators.required]),
       grammage:new FormControl(null,[Validators.required]),
       type:new FormControl(null,[Validators.required]),
       date_stock: new FormControl(null,[Validators.required]),
       poids:new FormControl(0,[Validators.required]),
       qte_stock: new FormControl(0,[Validators.required]),
       depotID:new FormControl(0,[Validators.required]),
       lignedepID:new FormControl(0,[Validators.required])
     })
   }
   getDepot()
   {
     this.DS.OnGet().subscribe((result) => {
       this.depot = result;
     });
   }

   GetrechercherProduits() {

    const idDepot = this.ProduitForm.get('depotID')?.value;
   
    if (idDepot) {
        this.LDS.getLigneDepByDepot(idDepot).subscribe(
            (data) => {
                this.dataLD = data;
            },
            (error) => {
                console.error("Une erreur s'est produite : ", error);
            }
        );
    }
  }
  getProduit() {
    this.PS.OnGet().subscribe(data => {
      this.datasource.data = data;
      console.log(data)
      this.OnLoud=true;
    });
  }

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

  validGrammage() { // controle form
    this.GrammageErrors = [];
    this.formGrammageError = {};
    let validFlag = true;
    if (!this.ProduitForm.value.grammage) {
      this.GrammageErrors.push('grammage');
      this.formGrammageError.errorForgrammage = 'il faux remplire la grammage de produit';
      validFlag = false;
    }
    return validFlag;
  }

  onGrammageFocus() {
    this.isFocusedGrammage = true;
  }

  onGrammageBlur() {
    this.isFocusedGrammage = false;
    this.checkGrammageError();
  }

  clearGrammageError() {
    const index = this.GrammageErrors.indexOf('grammage');
    if (index > -1) {
      this.GrammageErrors.splice(index, 1);
      this.formGrammageError.errorForgrammage = '';
    }
  }

  checkGrammageError() {
    if (!this.validGrammage() && !this.isFocusedGrammage) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.GrammageErrors.push('grammage');
      this.formGrammageError.errorForgrammage = 'Il faut remplir la grammage de produit';
    }
  }

  validPoids() { // controle form
    this.PoidsErrors = [];
    this.formPoidsError = {};
    let validFlag = true;
    if (!this.ProduitForm.value.poids) {
      this.PoidsErrors.push('poids');
      this.formPoidsError.errorForpoids = 'Il faut remplir la poids de produit';
      validFlag = false;
    }
    return validFlag;
  }

  onPoidsFocus() {
    this.isFocusedPoids = true;
  }

  onPoidsBlur() {
    this.isFocusedPoids = false;
    this.checkPoidsError();
  }

  clearPoidsError() {
    const index = this.PoidsErrors.indexOf('poids');
    if (index > -1) {
      this.PoidsErrors.splice(index, 1);
      this.formPoidsError.errorForpoids = '';
    }
  }

  checkPoidsError() {
    if (!this.validPoids() && !this.isFocusedPoids) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.PoidsErrors.push('poids');
      this.formPoidsError.errorForpoids = 'Il faut remplir la poids de produit';
    }
  }

  validQualiter() { // controle form
    this.QualiterErrors = [];
    this.formQualiterError = {};
    let validFlag = true;
    if (!this.ProduitForm.value.qualiter) {
      this.QualiterErrors.push('qualiter');
      this.formQualiterError.errorForqualiter = 'il faux remplire la qualiter de produit';
      validFlag = false;
    }
    return validFlag;
  }

  onQualiterFocus() {
    this.isFocusedQualite = true;
  }

  onQualiterBlur() {
    this.isFocusedQualite = false;
    this.checkQualiterError();
  }

  clearQualiterError() {
    const index = this.QualiterErrors.indexOf('qualiter');
    if (index > -1) {
      this.QualiterErrors.splice(index, 1);
      this.formQualiterError.errorForqualiter = '';
    }
  }

  checkQualiterError() {
    if (!this.validQualiter() && !this.isFocusedQualite) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.QualiterErrors.push('qualiter');
      this.formQualiterError.errorForqualiter = 'Il faut remplir la qualiter de produit';
    }
  }

  validDate() { // controle form
    this.DateErrors = [];
    this.formDateError = {};
    let validFlag = true;
    if (!this.ProduitForm.value.date_stock) {
      this.DateErrors.push('date');
      this.formDateError.errorFordate = 'il faux choisir un date ';
      validFlag = false;
    }
    return validFlag;
  }

  onDateFocus() {
    this.isFocusedDate = true;
  }

  onDateBlur() {
    this.isFocusedDate = false;
    this.checkDateError();
  }

  clearDateError() {
    const index = this.DateErrors.indexOf('date');
    if (index > -1) {
      this.DateErrors.splice(index, 1);
      this.formDateError.errorFordate = '';
    }
  }

  checkDateError() {
    if (!this.validDate() && !this.isFocusedDate) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.DateErrors.push('date');
      this.formDateError.errorFordate = 'Il faut choisir un date';
    }
  }

  validType() { // controle form
    this.TypeErrors = [];
    this.formTypeError = {};
    let validFlag = true;
    if (!this.ProduitForm.value.type) {
      this.TypeErrors.push('type');
      this.formTypeError.errorFortype = 'il faux choisir un type de produit ';
      validFlag = false;
    }
    return validFlag;
  }

  onTypeFocus() {
    this.isFocusedType = true;
  }

  onTypeBlur() {
    this.isFocusedType = false;
    this.checkTypeError();
  }

  clearTypeError() {
    const index = this.TypeErrors.indexOf('type');
    if (index > -1) {
      this.TypeErrors.splice(index, 1);
      this.formTypeError.errorFortype = '';
    }
  }

  checkTypeError() {
    if (!this.validType() && !this.isFocusedType) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.TypeErrors.push('type');
      this.formTypeError.errorFortype = 'Il faut choisir un type de produit';
    }
  }

  validDepot() { // controle form
    this.DepotErrors = [];
    this.formDepotError = {};
    let validFlag = true;
    if (!this.ProduitForm.value.depotID) {
      this.DepotErrors.push('depot');
      this.formDepotError.errorFordepot = 'il faux choisir un depôt';
      validFlag = false;
    }
    return validFlag;
  }

  onDepotFocus() {
    this.isFocusedDepot = true;
  }

  onDepotBlur() {
    this.isFocusedDepot = false;
    this.checkDepotError();
  }

  clearDepotError() {
    const index = this.DepotErrors.indexOf('depot');
    if (index > -1) {
      this.DepotErrors.splice(index, 1);
      this.formDepotError.errorFordepot = '';
    }
  }

  checkDepotError() {
    if (!this.validDepot() && !this.isFocusedDepot) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.DepotErrors.push('depot');
      this.formDepotError.errorFordepot = 'Il faut choisir un depôt';
    }
  }

  validLigne() { // controle form
    this.LigneErrors = [];
    this.formLigneError = {};
    let validFlag = true;
    if (!this.ProduitForm.value.lignedepID) {
      this.LigneErrors.push('ligne');
      this.formLigneError.errorForligne = 'il faux choisir une ligne depôt';
      validFlag = false;
    }
    return validFlag;
  }

  onLigneFocus() {
    this.isFocusedLigne = true;
  }

  onLigneBlur() {
    this.isFocusedLigne = false;
    this.checkLigneError();
  }

  clearLigneError() {
    const index = this.LigneErrors.indexOf('ligne');
    if (index > -1) {
      this.LigneErrors.splice(index, 1);
      this.formLigneError.errorForligne = '';
    }
  }

  checkLigneError() {
    if (!this.validLigne() && !this.isFocusedLigne) {
      // Vérifie s'il y a des erreurs et si l'input n'est pas en focus
      this.LigneErrors.push('ligne');
      this.formLigneError.errorForligne = 'Il faut choisir une ligne depôt';
    }
  }

  closeModalAndShowSwal(): void {
  this.closeModal.nativeElement.click(); // Ferme le modal
  Swal.fire({ // Affiche la boîte de dialogue Swal
    title: '',
    text: 'Ajout Avec succès',
    icon: 'success',
    confirmButtonText: 'Close'
  });
}
  onsub(){
    // console.log(this.CategorieForm.value.nomCat)
    if (!this.validQualiter() || !this.validDate || !this.validGrammage() || !this.validPoids || !this.validType || !this.validDepot || !this.validLigne) {
      return
    }
    console.log(this.ProduitForm.value)
    this.PS.OnSave(this.ProduitForm.value).subscribe(()=> {
      this.getProduit();

      Swal.fire({
        title: '',
        text: 'Ajout Avec succes',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) { // Vérifie si l'utilisateur a cliqué sur le bouton de confirmation
          location.reload();
          this.getProduit();
        }
      });



    });
  }

  closeModalAndResetForm() {
    this.ProduitForm.reset(); // Réinitialiser le formulaire
    this.closeModal.nativeElement.click(); // Fermer le modal

  }
}
