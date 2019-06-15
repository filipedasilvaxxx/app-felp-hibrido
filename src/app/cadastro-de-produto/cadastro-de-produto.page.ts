import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavParams, NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-cadastro-de-produto',
  templateUrl: './cadastro-de-produto.page.html',
  styleUrls: ['./cadastro-de-produto.page.scss'],
})
export class CadastroDeProdutoPage implements OnInit {

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  formGroup: FormGroup;
  produto = new Produto();


  imagem : string = "";
  
  listaCategoria : Categoria[] = [];


  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
   
    public navCtrl: NavController) {

      this.firestore.settings(this.settings);

    this.formGroup = this.formBuilder.group({
      nome: [''],
      marca: [''],
      informacao: [''],
      codigo: [''],
      categoria: [''],
      
    })
  }

  
  ngOnInit() {

    this.getList();
  }

  cadastrar() {
    this.loading();

    let ref = this.firestore.collection('produto')
    ref.add(this.formGroup.value)
      .then(() => {
        console.log('Cadastrado com sucesso');
        this.router.navigate(['/loja-perfil']);
        this.loadingController.dismiss();
        
      }).catch(() => {
        console.log('Erro ao cadastrar');
        this.loadingController.dismiss();
       
      })
  }

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("categoria");
    ref.get().then(query => {
        query.forEach(doc => {
          
            let c = new Categoria();
            c.setDados(doc.data());
            this.listaCategoria.push(c);
            
        });
       
        this.loadingController.dismiss();
    });

  }


  enviaArquivo(event){
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref()
                  .child(`produtos/${this.produto.id}.jpg`);
    
    ref.put(imagem).then(url=>{
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })

  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`produtos/${this.produto.id}.jpg`);

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
