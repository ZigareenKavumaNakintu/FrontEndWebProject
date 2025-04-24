import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SongsPage implements OnInit {
  title : string="";
  artist :string="";
  songLyrics: any [] =[];
  constructor(private storage:Storage, private dataService: DataService) { }

   async ngOnInit() {
    const data = await this.dataService.getSongData();
    this.songLyrics = data.lyrics;
    console.log(this.songLyrics);

    
  }

  
   async OnSubmitClick(){
    console.log(this.title);
    console.log(this.artist);
    await this.storage.create();
    await this.storage.set('title',this.title);
    await this.storage.set('artist',this.artist);
  }

}
