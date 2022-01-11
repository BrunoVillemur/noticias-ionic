import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[]=[];
  estado: string;
  constructor(private storage: Storage, private toastCtrl: ToastController) { 
    this.cargarFavoritos();
  }

  guardarNoticia(noticia:Article,){
    this.estado='Guardado en';
    const existent = this.noticias.find( noti=>
      noti.title===noticia.title
    );
    if(!existent){
       this.noticias.unshift( noticia)
       this.storage.set('favoritos', this.noticias);
    }
    this.mostrarToast(this.estado);
  }
  async cargarFavoritos(){
    const favoritos= await this.storage.get('favoritos');
    if(favoritos){
      this.noticias=favoritos;
    }else{
     
    }
    
    
  }
  borrarNoticia(noticia: Article){
    this.estado='borrado de';
    this.noticias=this.noticias.filter(noti=>
     noti.title !== noticia.title );
     this.storage.set('favoritos', this.noticias);
     this.mostrarToast(this.estado);
  }

  async mostrarToast(estado){
    const toast = await this.toastCtrl.create({
      message: `Se ha ${estado} Favoritos`,
      duration: 1500
    });
    toast.present();
  }

}

