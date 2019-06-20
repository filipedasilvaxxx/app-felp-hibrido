import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import * as firebase from 'firebase';

@Component({
  selector: 'app-creatine-list',
  templateUrl: './creatine-list.page.html',
  styleUrls: ['./creatine-list.page.scss'],
})
export class CreatineListPage implements OnInit {

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  produto: Produto = new Produto();

  nome : string = "";

  imagem : string = "";

  listaCreatina : Produto[] = [];

  
  constructor() { }

  ngOnInit() {
    this.obterCategoria();
    this.downloadFoto();
  }


  obterCategoria() {
    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
        query.forEach(doc => {
          
            let c = new Produto();
            c.setDados(doc.data());
            c.id = doc.id;

            let ref = firebase.storage().ref()
            .child(`produtos/${doc.id}.jpg`);
      
            ref.getDownloadURL().then(url => {
              c.img = url;

             if(c.categoria == "creatina"){  
                console.log(c);
                this.listaCreatina.push(c)
                
              }
            }).catch(()=>{

            })

      });
 
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
}