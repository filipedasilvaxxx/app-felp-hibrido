import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Cadastre sua Loja',
      url: '/cadastro-de-loja',
      icon: 'home'
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'home'
    },
    {
      title: 'Bcaa',
      url: '/bcaa-list',
      icon: 'home'
    },
    {
      title: 'Lista Tribulus',
      url: '/tribulus-list',
      icon: 'home'
    },
    {
      title: 'Lista Creatina',
      url: '/creatine-list',
      icon: 'home'
    },
    {
      title: 'busca',
      url: '/busca',
      icon: 'home'
    },
    
  
  
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth : AngularFireAuth,
    private router : Router
    
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseauth.authState
      .subscribe(
        user => {
          if (user) {
            this.router.navigate(['/home-cliente']);

            } else {
              this.router.navigate(['/']);
            }
        },
        () => {
          this.router.navigate(['/home-cliente']);
        }
      );
  }  
    
}
