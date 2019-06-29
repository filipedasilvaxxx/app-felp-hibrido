import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavParams, NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';

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


 
  
  id : string;
  idFoto : string = "";
  listaCategoria : Categoria[] = [];


  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public fire: AngularFireAuth,
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.paramMap.get('loja');
      console.log(this.id);
      
    this.formGroup = this.formBuilder.group({
      nome: [''],
      marca: [''],
      informacao: [''],
      codigo: [''],
      categoria: [''],
      img: [this.produto.img],
      preco: [''],
      loja : [this.id]
      
    })
  }

  
  ngOnInit() {

    this.getList();
  }

  cadastrar() {
   
    this.loading();
   let ref = this.firestore.collection('produto')
    ref.add(this.formGroup.value)
      .then(resp =>{
        this.toast('Produto Cadastrada com sucesso');
       // this.router.navigate(['/produtos']);
        //this.loadingController.dismiss();
        // console.log(getList{{marcas.nome}});
        this.idFoto = resp.id;
        this.router.navigate(['/envia-foto',  {'foto' : resp.id}] )
        console.log("ID: " + resp.id);

      }).catch(()=>{
        this.toast("Erro ao Cadastrar!");
        this.loadingController.dismiss();
      })
     
  }
  
  enviaArquivo(event){
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref()
                    .child(`produtos/${this.idFoto}.jpg`);
    ref.put(imagem).then(url=>{
      console.log('Enviado com Sucesso')
      

    })

  }

  downloadFoto(){
    let ref = firebase.storage().ref()
      .child(`produtos/${this.produto.id}.jpg`);

      ref.getDownloadURL().then( url=>{ 
        this.imagem = url;
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
