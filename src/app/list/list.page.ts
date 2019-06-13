import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Loja } from '../model/loja';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage {

  @ViewChild('email') email;
  @ViewChild('senha') senha;

  loja: Loja = new Loja();
  nome : string;

  constructor(public router : Router,
              public navctrl : NavController,
              public fire : AngularFireAuth){
  }

  logar(){
    this.fire.auth.signInWithEmailAndPassword(this.email.value,this.senha.value)
      .then(()=>{
        
        console.log('Logado com sucesso');
        
      }).catch((error) => {
        console.log("Error getting document:", error);
        console.log('Login Inválido');
      });

        
      }
      
  

  cadastrar(){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value,this.senha.value)
    .then(()=> {
      console.log("Cadastrado com sucesso!");
    }).catch(()=>{
      console.log("Usuário inválido");
    })

  }



}