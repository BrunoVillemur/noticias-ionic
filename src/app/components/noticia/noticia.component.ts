import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos;
  constructor(private iab: InAppBrowser, private actionShetCtrl: ActionSheetController, private socialSharinCtrl: SocialSharing, private dataLocalService: DataLocalService) { }

  ngOnInit() {
    
    
  }
  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
    
  }
  async lanzarMenu(){
    let guardarBorrarBtn;
    if(this.enFavoritos){
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        cssClass: 'action-dark',
        icon: 'trash',
        handler: () => {
          console.log('Borrar de Favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };
    }else{
      guardarBorrarBtn = {
        text: 'Favorito',
        cssClass: 'action-dark',
        icon: 'star',
        handler: () => {
          console.log('Play clicked');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }


    const actionSheet = await this.actionShetCtrl.create({
      
      buttons: [
        {
        text: 'Compartir',
        cssClass: 'action-dark',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharinCtrl.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url,
          );
        }
      },
      guardarBorrarBtn,
       {
        text: 'Cancelar',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
