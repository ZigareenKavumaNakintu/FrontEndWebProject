import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonList, IonLabel, IonItem ,IonThumbnail, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/Services/data.service';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-humour',
  templateUrl: './humour.page.html',
  styleUrls: ['./humour.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonLabel, IonList, IonCardContent, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonThumbnail,IonToolbar, CommonModule, FormsModule]
})
export class HumourPage implements OnInit {
  myJokes:any []=[];
  constructor(private dataService:DataService,private router: Router) { }

  ngOnInit() {
    //get the data from the api and store it in the myJokes array
    this.dataService.getHumourData().subscribe(
      (response)=>{
        this.myJokes = response.data.memes;
        console.log(response);
      }
    )
  }
  //using the Browser plugin to navigate another page on the browser using the url
  openBrowser(){
    Browser.open({
      url: 'https://www.theirishroadtrip.com/funny-irish-jokes/'
    })
  }

  //use router to go back to homePage once clicked
  returnHome(){
    this.router.navigate(['/home']);
  }
}
