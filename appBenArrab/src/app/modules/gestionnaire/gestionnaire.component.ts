import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/Modeles/User';
import { UserService } from 'src/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionnaire',
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.css']
})
export class GestionnaireComponent implements OnInit{
  constructor(private US:UserService,private viewContainer: ViewContainerRef,private modalService: NgbModal) {}
  datasource =new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'nom','action'];
  OnLoud:boolean=false;
  errors: any = [];
  formError: any = {};
  isFocused: boolean = false;
  userData!:User[];
  @ViewChild('closeModal') closeModal: ElementRef

  ngOnInit(): void {
    this.getUser();
    this.OnLoud=true;
  }

  getUser() {
    this.US.OnGet().subscribe(data => {
      this.userData = data;
      console.log(data);
      //this.OnLoud=true;
    });
  }

  GestionnaireForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    psw: new FormControl('', [Validators.required]),
  });

  validForm() { // controle form
    this.errors = [];
    this.formError = {};
    let validFlag = true;
    if (!this.GestionnaireForm.value.nom) {
      this.errors.push('nom');
      this.formError.errorFornom = 'il faux remplire le nom  de la categorie';
      validFlag = false;
    }
    return validFlag;
  }
  getGestionnaire() {
    this.US.OnGet().subscribe(data => {
      this.datasource.data = data;
      console.log(data);
      this.OnLoud=true;
    });
  }
  onsub(){
    // console.log(this.CategorieForm.value.nomCat)
    if (!this.validForm()) {
      return
    }
    console.log(this.GestionnaireForm.value)

    let ajoutGest = {
      nom: this.GestionnaireForm.value.nom,
      prenom: this.GestionnaireForm.value.prenom,
      tel: this.GestionnaireForm.value.tel,
      email: this.GestionnaireForm.value.email,
      password: this.GestionnaireForm.value.psw,
      type_user: 'admin'
    };
    console.log("aaaaaaaaaaaaaaaaaaaaa");
    console.log(ajoutGest);
    this.US.OnSave(ajoutGest).subscribe(()=> {
      this.getGestionnaire();

      Swal.fire({
        title: '',
        text: 'Ajout Avec succes',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) { // Vérifie si l'utilisateur a cliqué sur le bouton de confirmation
          location.reload();
          this.getGestionnaire();
        }
      });



    });
  }
  closeModalAndResetForm() {
    this.GestionnaireForm.reset(); // Réinitialiser le formulaire
    this.closeModal.nativeElement.click(); // Fermer le modal

  }

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
      this.formError.errorFornom = 'Il faut remplir le nom de la catégorie';
    }
  }
}
