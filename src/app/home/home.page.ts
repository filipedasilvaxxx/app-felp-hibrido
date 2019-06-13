import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Loja } from '../model/loja';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  
  loja: Loja = new Loja();
  email : string;

  listaPerfil : Loja[] = []; 

    constructor(public router : Router,
                private menu: MenuController,
                private firebaseauth : AngularFireAuth,
                public activatedRoute: ActivatedRoute){
        
      
    }

  ngOnInit() {
      
    }
   

  cadastrarLoja(){
  this.router.navigate(['/cadastro-de-loja']);
  }
  
  bcaa(){
    this.router.navigate(['/bcaa']);
    }
  whey(){
    this.router.navigate(['/whey-list']);
  }
  creatina(){
    this.router.navigate(['/creatina-list']);
  }
  tribulus(){
    this.router.navigate(['/tribulus-list']);
  }

  logar(){
    this.router.navigate(['/list']);
    }
  logoff(){
      this.router.navigate(['/logoff']);
      }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  CalculeSuaIMC(){
    this.router.navigate(['/imc']);

  }
  
  
}
