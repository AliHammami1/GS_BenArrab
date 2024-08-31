import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/core/shared/socket.service';
import { AuthService } from '../../../../Services/auth.service';
import { navItems } from 'src/app/core/default-layout/_nav';
import Swal from 'sweetalert2';
import { UserService } from 'src/Services/user.service';
import { User } from 'src/Modeles/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public navItems = navItems;
  emailErrors: string[] = [];
  emailFormError: any = {};
  isEmailFocused: boolean = false;

  passwordErrors: string[] = [];
  passwordFormError: any = {};
  isPasswordFocused: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  isError: boolean = false;
  Fause: boolean = false;
  usse!:User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private socket: SocketService,
    private US:UserService
  ) {}
  validEmail() {
    this.emailErrors = [];
    this.emailFormError = {};
    let validFlag = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
    if (
      !this.loginForm.value.email ||
      !emailPattern.test(this.loginForm.value.email)
    ) {
      this.emailErrors.push('email');
      this.emailFormError.errorForEmail =
        'Veuillez saisir une adresse e-mail valide';
      validFlag = false;
    }
    return validFlag;
  }

  validPassword() {
    this.passwordErrors = [];
    this.passwordFormError = {};
    let validFlag = true;
    if (
      !this.loginForm.value.password ||
      this.loginForm.value.password.length < 8
    ) {
      this.passwordErrors.push('password');
      this.passwordFormError.errorForPassword =
        'Le mot de passe doit contenir au moins 8 caractères';
      validFlag = false;
    }
    return validFlag;
  }

  onEmailFocus() {
    this.isEmailFocused = true;
  }

  onEmailBlur() {
    this.isEmailFocused = false;
    this.checkEmailError();
  }

  onPasswordFocus() {
    this.isPasswordFocused = true;
  }

  onPasswordBlur() {
    this.isPasswordFocused = false;
    this.checkPasswordError();
  }

  clearEmailError() {
    const index = this.emailErrors.indexOf('email');
    if (index > -1) {
      this.emailErrors.splice(index, 1);
      this.emailFormError.errorForEmail = '';
    }
  }

  clearPasswordError() {
    const index = this.passwordErrors.indexOf('password');
    if (index > -1) {
      this.passwordErrors.splice(index, 1);
      this.passwordFormError.errorForPassword = '';
    }
  }

  checkEmailError() {
    if (!this.validEmail() && !this.isEmailFocused) {
      this.emailErrors.push('email');
      this.emailFormError.errorForEmail =
        'Veuillez saisir une adresse e-mail valide';
    }
  }

  checkPasswordError() {
    if (!this.validPassword() && !this.isPasswordFocused) {
      this.passwordErrors.push('password');
      this.passwordFormError.errorForPassword =
        'Le mot de passe doit contenir au moins 8 caractères';
    }
  }

  onSingIn() {
    if (!this.validPassword() || !this.validEmail()) {
      return;
    }
    this.US.getUserByEmail(this.loginForm.value.email).subscribe((res) => {
      this.usse = res;

      let myDictionary = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        type_user: this.usse.type_user,
      };

      this.authService.signIn(myDictionary).subscribe((response) => {
        console.log(response.status);
    
        if (response.status === true) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.user.id);
          localStorage.setItem('type', response.user.type_user);
    
          Swal.fire({
            title: '',
            text: 'Connexion avec succès',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              // Rediriger vers le tableau de bord
              this.router.navigate(['/dashboard']);
            }
          });
        } else {
          Swal.fire({
            title: '',
            text: 'Utilisateur non trouvé dans la base de données',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      }, (error) => {
        console.error('Erreur lors de la tentative de connexion :', error);
        // Afficher un message d'erreur générique en cas d'échec de la requête
        Swal.fire({
          title: '',
          text: 'Une erreur est survenue lors de la connexion. Veuillez réessayer.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
    });
    
  

 
  // if(this.Fause==false){
  //   Swal.fire({
  //     title: '',
  //     text: 'Email ou mot de passe incorrect1',
  //     icon: 'error',
  //     confirmButtonText: 'Ok'
  //   });
  // }

  }
  moveToForgetPassword() {
    this.router.navigate(['reset-password']);
  }
}
