import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, IonInfiniteScroll, ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Loja } from '../model/loja';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Produto } from '../model/produto';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild("textoBusca") textoBusca;

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
                public actionSheetController: ActionSheetController
                 ){
  
                  this.firebaseauth.authState.subscribe(obj=>{
                    this.id = this.firebaseauth.auth.currentUser.uid;
                    this.obterCliente();
                    
              
                  });


      
      
    }


  ngOnInit() {
    
    }

    irCadastroLoja(){
      this.router.navigate(['/cadastro-de-loja']);
    }

    lojaPerfil(obj : Loja){
      this.router.navigate(['/loja-perfil', {'loja' : this.id}]);
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

   

    busca(){
    console.log(this.textoBusca.value)
    
    this.listaDeProduto = [];
      var ref = firebase.firestore().collection("produto");
      //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {
      ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value+'\uf8ff').get().then(doc=> {

        if (doc.size>0) {
          
          doc.forEach(doc =>{

            let r = new Produto();
            r.setDados(doc.data());
            r.id = doc.id;
            
            
              console.log(r);
              this.listaDeProduto.push(r);
              
          })
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      })
    
    //this.router.navigate(['/Produto', { 'filtro': "busca" }]);
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
    
  }

  
  
  
}
