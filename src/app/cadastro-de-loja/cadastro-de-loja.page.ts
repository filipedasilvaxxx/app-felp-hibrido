import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Loja } from '../model/loja';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-cadastro-de-loja',
  templateUrl: './cadastro-de-loja.page.html',
  styleUrls: ['./cadastro-de-loja.page.scss'],
})
export class CadastroDeLojaPage implements OnInit {
  @ViewChild('email') email;
  @ViewChild('senha') senha;


  formGroup : FormGroup;

  id : string;
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  
  

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public fire: AngularFireAuth) {
    

                this.fire.authState.subscribe(obj=>{
                  
                  this.id = this.fire.auth.currentUser.uid;
         
                });

    this.formGroup = this.formBuilder.group({
      nome : [''],
      telefone : [''],
      email : [''],
      senha : [''],
      cnpj : [''],
      endereco : [''],
    })
   }

  ngOnInit() {

   
  }

  cadastrar(){
    this.loading();
    //let ref = this.firestore.collection('loja').doc("dfnidsafoin").set(this.formGroup.value)
    let ref = this.firestore.collection('loja').doc(this.id)
      .set(this.formGroup.value).then(() =>{
        console.log('Cadastrado com sucesso');
        this.router.navigate(['/loja-perfil']);
        this.loadingController.dismiss();
        this.toast('Cadastrado com sucesso');
      }).catch(err =>{
        console.log(err);
        this.loadingController.dismiss();
        this.toast('Erro ao cadastrar');
      })
  }

  
  logar(){
    this.fire.auth.signInWithEmailAndPassword(this.email.value,this.senha.value)
      .then(()=>{
        console.log('Logado com sucesso');
      })
      .catch(()=>{
        console.log('Login Inválido');
      })
  }

  cadastrarLogin(){
    this.fire.auth.createUserWithEmailAndPassword(this.email.value,this.senha.value)
    .then(()=> {
      this.logar();
      console.log("Cadastrado com sucesso!");
    }).catch(()=>{
      console.log("Usuário inválido");
    })

  }
  

 
  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

  async toast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();

  }
}
