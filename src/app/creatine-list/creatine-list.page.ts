import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import * as firebase from 'firebase';

@Component({
  selector: 'app-creatine-list',
  templateUrl: './creatine-list.page.html',
  styleUrls: ['./creatine-list.page.scss'],
})
export class CreatineListPage implements OnInit {

  @ViewChild("textoBusca") textoBusca;

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  produto: Produto = new Produto();

  nome: string = "";

  imagem: string = "";
  idImagem : Produto[] = [];
  

  id : string = "";
  listaCreatina: Produto[] = [];


  constructor() { }

  ngOnInit() {
    this.obterCategoria();
  }


  busca() {
    console.log(this.textoBusca.value)

    this.listaCreatina = [];
    var ref = firebase.firestore().collection("roupas");

    ref.orderBy('roupa').startAfter(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

      if (doc.size > 0) {

        doc.forEach(doc => {

          
        let c = new Produto();
        c.setDados(doc.data());
        c.id = doc.id;

          if (c.categoria == "creatina") {
            console.log(c);
            
            let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
              c.img = url;
              this.listaCreatina.push(c)
   
            }).catch(err => {
              this.listaCreatina.push(c);
            })            
            
  
          }
       
  
        });

  obterCategoria() {
    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new Produto();
        c.setDados(doc.data());
        c.id = doc.id;

       

        console.log(c.id);
        

        if (c.categoria == "creatina") {
          console.log(c);
          
          let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
            c.img = url;
            this.listaCreatina.push(c)
 
          }).catch(err => {
            this.listaCreatina.push(c);
          })            
          

        }
     

      });

    });

  }

  



}