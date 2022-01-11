import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  noticias: Article[]=[];
  @ViewChild(IonSegment, {static: true}) asd: IonSegment;
  categorias: string[]=['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']; 
  constructor(private notiaciasService: NoticiasService) {}

  ngOnInit(){
    this.asd.value=this.categorias[0];
    this.cargarNoticias(this.asd.value);
    
    
  }
  segmentChanged(event){
    this.noticias=[]
    this.cargarNoticias(event.detail.value)

  }

  cargarNoticias(categoria: string, event?){
    
    
    this.notiaciasService.getTopHeadlinesCategoria(categoria).subscribe(resp=>{

      if(resp.articles.length === 0){
        console.log(resp.articles.length);
        
        event.target.disabled=true;
        event.target.complete();
        return;
      }
      this.noticias.push(...resp.articles);
    });

    if(event){
      event.target.complete();
    }
  }

  loadData(event){
    
    this.cargarNoticias(this.asd.value, event);
  }

}
