import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sgm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {  
  constructor(
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    //this.snackBar.open('Bem Vindo!', 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
  }
}
