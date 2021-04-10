import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  login: boolean = false;

  constructor(private auth: AuthService) { }
  ngOnInit() {
      this.login = this.auth.usuarioEstaAutenticado();
  }
  title: String = 'SGM';
  
  sair() {
    const usuario = JSON.parse(localStorage.getItem('userAuth') ?? "{}");
    if (usuario && usuario.token) {
      localStorage.removeItem('userAuth');      
      localStorage.removeItem('userCidadao');
      localStorage.clear();
      window.location.reload();        
    }
  }
}
