import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Depot } from 'src/Modeles/Depot';
import { DepotService } from 'src/Services/depot.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit{
  constructor(private _liveAnnouncer: LiveAnnouncer,private DS:DepotService,private viewContainer: ViewContainerRef,private modalService: NgbModal) {}
  datasource =new MatTableDataSource<Depot>();
  displayedColumns: string[] = ['id', 'nom','action'];
  errors: any = [];
  formError: any = {};
  idparcour:number =0;
  isFocused: boolean = false;// pour les errors de form
  DepotForm = new FormGroup({
    nomdepot: new FormControl('', [Validators.required]),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('closeModal') closeModal: ElementRef

  OnLoud:boolean=false;
  ngOnInit(): void {
    this.getDepot();
  }

  getDepot() {
    this.DS.OnGet().subscribe(data => {
      this.datasource.data = data;
      console.log(data);
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
  validForm() { // controle form
    this.errors = [];
    this.formError = {};
    let validFlag = true;
    if (!this.DepotForm.value.nomdepot) {
      this.errors.push('nom');
      this.formError.errorFornom = 'il faux remplire le nom  de depôt';
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
      this.formError.errorFornom = 'Il faut remplir le nom de depôt';
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
    if (!this.validForm()) {
      return
    }
    console.log(this.DepotForm.value)
    this.DS.OnSave(this.DepotForm.value).subscribe(()=> {
      this.getDepot();

      Swal.fire({
        title: '',
        text: 'Ajout Avec succes',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) { // Vérifie si l'utilisateur a cliqué sur le bouton de confirmation
          location.reload();
          this.getDepot();
        }
      });



    });
  }

  closeModalAndResetForm() {
    this.DepotForm.reset(); // Réinitialiser le formulaire
    this.closeModal.nativeElement.click(); // Fermer le modal

  }

  

}
