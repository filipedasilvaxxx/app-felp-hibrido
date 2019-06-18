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
  
  listaCategoria : Categoria[] = [];


  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public fire: AngularFireAuth,
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.paramMap.get('loja');

      this.fire.authState.subscribe(obj=>{
                  
        this.id = this.fire.auth.currentUser.uid;

      });
    this.formGroup = this.formBuilder.group({
      nome: [''],
      marca: [''],
      informacao: [''],
      codigo: [''],
      categoria: [''],
      preco: [''],
      
    })
  }

  
  ngOnInit() {

    this.getList();
  }

  cadastrar() {
    this.loading();

    let ref = this.firestore.collection('produto').doc(this.id)
      .set(this.formGroup.value).then(() =>{
      
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


 

  
  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

  

}
