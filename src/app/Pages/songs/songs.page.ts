import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';


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
  errorMessage: string="";
  songLyrics: any [] =[];
  constructor(private storage:Storage, private dataService: DataService,private router:Router) { }

   async ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.storage.create();
    //if the title and artist exist then get the value stored in storage or print nothing ''
    this.title = await this.storage.get('title') || '';
    this.artist = await this.storage.get('artist') || '';
  
    if (this.title && this.artist) {
      await this.loadData(this.title, this.artist);
    }
  }
  //set the variables and call ngOnInit so that the page cansend the new variables to the api
   async OnSubmitClick(){
    
    console.log(this.title);
    console.log(this.artist);
    await this.storage.create();
    await this.storage.set('title',this.title);
    await this.storage.set('artist',this.artist);
     await this.loadData(this.title,this.artist);
  }

  async toHomePage(){
    await this.clearStorage();
    await this.router.navigateByUrl('/home');
  }

  /**clears the storage variables so that no lyrics show at first when you open the page */
  private async clearStorage(){
    try{
      this.songLyrics = [];//dont show any lyrics on the page
      this.errorMessage = "";//dont display any error messagewhen storage is cleared

      await  this.storage.clear();
      console.log("cleared storage")
    }
    catch(error){
      console.error('Failed to clear storage:', error);
    }
  }
   
  private async loadData(title: string, artist: string){
    try{
      const data = await this.dataService.getSongData(title, artist);
      /*split the words whenever you reach a "\n" so that we can use ngFor and can be showed like noormal lyrics not 
      one block of code*/
      this.songLyrics = data.lyrics.split('\n');
      
      console.log(this.songLyrics);
    }
    catch(error){
      console.error('Error loading recipes:', error);
      this.errorMessage = 'Sorry, we couldn\'t find the lyrics for this song. Please input another song and artist.';
    }
  }
  

}
