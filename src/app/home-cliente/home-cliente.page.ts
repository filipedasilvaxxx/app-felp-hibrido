import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Loja } from '../model/loja';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {
  
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  
  loja: Loja = new Loja();
  email : string;
  nome : string;
  listaPerfil : Loja[] = []; 

  listaDeProduto : Produto[] = [];

  id : string;

    constructor(public router : Router,
                private menu: MenuController,
                private firebaseauth : AngularFireAuth,

                 ){
  
        this.id = this.firebaseauth.auth.currentUser.uid;
      
      
    }

    


  ngOnInit() {
    
      //this.obterCliente();
    }

    
    obterCliente() {
      var ref = firebase.firestore().collection("loja").doc(this.id);
      ref.get().then(doc => {
      this.loja.setDados(doc.data());
      console.log(doc.data());
      
      }).catch((error) => {
        console.log("Error getting document:", error);
      
  
      });
    }

  cadastrarLoja(){
  this.router.navigate(['/cadastro-de-loja']);
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

  Pesquisa(event) {

    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
        query.forEach(doc => {
            let c = new Produto();
            c.setDados(doc.data());
            c.id = doc.id;
            this.listaDeProduto.push(c);
        });
       
    });
    
    return "listaDeProduto"
  }
  
  
}
