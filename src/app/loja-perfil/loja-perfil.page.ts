import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Produto } from '../model/produto';
import { FormGroup } from '@angular/forms';
import { Loja } from '../model/loja';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loja-perfil',
  templateUrl: './loja-perfil.page.html',
  styleUrls: ['./loja-perfil.page.scss'],
})
export class LojaPerfilPage implements OnInit {

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
 
  formGroup: FormGroup;

  loja : Loja = new Loja();
  id: string;
  

  listaLoja = [];
  imagem : string = "";

  constructor(public activatedRoute: ActivatedRoute,
              public router : Router,
              public loadingController: LoadingController,
              private firebaseauth : AngularFireAuth,
              private formBuilder: FormBuilder) {
    this.id = this.activatedRoute.snapshot.paramMap.get('loja');
    this.form();
 
  }

  form(){
    this.formGroup = this.formBuilder.group({
      nome : [this.loja.nome],
      telefone : [this.loja.telefone],
      email : [this.loja.email],
      cnpj : [this.loja.cnpj],
      endereco : [this.loja.endereco],
    })
  }

  ngOnInit() {
      this.obterCliente();
      this.downloadFoto();
    
  }

  obterCliente() {

    var ref = firebase.firestore().collection("loja").doc(this.id);
      ref.get().then(doc => {
      this.loja.setDados(doc.data());
      this.form();
      console.log(this.loja);
       
    }).catch(function (error) {
      console.log("Error getting document:", error);
    

    });
  }



  cadastroDeProduto(){
    this.router.navigate(['/cadastro-de-produto'])
  }
  
  enviaArquivo(event){
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref()
                  .child(`lojas/${this.loja.id}.jpg`);
    
    ref.put(imagem).then(url=>{
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })

  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`lojas/${this.loja.id}.jpg`);

      ref.getDownloadURL().then( url=>{ 
        this.imagem = url;
      })
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

}
