import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';

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
  constructor() { }

  ngOnInit() {
  }

  OnSubmitClick(){

  }

}
