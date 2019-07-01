import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-envia-foto',
  templateUrl: './envia-foto.page.html',
  styleUrls: ['./envia-foto.page.scss'],
})
export class EnviaFotoPage implements OnInit {

  firestore = firebase.firestore();
  
  produto = new Produto();

  imagem : string = "";

  constructor(public activatedRoute: ActivatedRoute,
              public router: Router) {
                
               }

  ngOnInit() {
  }

  enviaArquivo(event){
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref()
    //                .child(`produtos/${this.id}.jpg`);
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

  enviaImagem(){
    this.router.navigate(["/cadastro-de-produto"])
  }
}

