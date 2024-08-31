import { Component, OnInit } from '@angular/core';
import { navItems, navItemsSimple } from '../_nav';
import { AuthService } from 'src/Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {
  navItems! :any
  tyCon = localStorage.getItem("type");
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.tyCon=='superadmin')
      this.navItems = navItems;
    else
    this.navItems = navItemsSimple;
  }
  Deconnexion(){


      Swal.fire({
        title: 'Êtes-vous sûr de vouloir vous déconnecter?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          // Déconnexion de l'utilisateur
          // Vous pouvez appeler une fonction de déconnexion ici
          this.authService.logout().subscribe((x)=> {
            console.log(x);
            this.router.navigate(['/login']);
          });

        }
      });




  }


}
