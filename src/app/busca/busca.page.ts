import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import * as firebase from 'firebase';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {

  firestore = firebase.firestore();
  
  produto: Produto = new Produto();

  listaProduto : Produto[] = [];


  constructor() { }

  ngOnInit() {
  }


  obterCategoria() {
    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
        query.forEach(doc => {
          
            let c = new Produto();
            c.setDados(doc.data());

            this.listaProduto.push(c);
            console.log(c)
          });

    
        });
      
}
}
