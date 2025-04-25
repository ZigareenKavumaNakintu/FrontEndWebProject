import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonItem, IonLabel ,IonList, IonHeader, IonTitle, IonToolbar,IonRadio, IonRadioGroup, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/Services/data.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [IonButton, IonList, IonItem, IonLabel,IonList ,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonRadio, IonRadioGroup]
})
export class RecipesPage implements OnInit {
  recipe: string="";
  myRecipes:any[] =[];
  data: any[] =[];

  constructor(private dataService:DataService, private storage: Storage,private router:Router) { }

   async ngOnInit() {
      await this.loadDataFromApi();
    }
  
  /*this happens when the poage is coming into view-get the variable that has been stored in the storage 
  call the loadData method to get dfata from api*/
  async ionViewWillEnter(){
    await this.storage.create();
    this.recipe = await this.storage.get('recipe');
    await this.loadDataFromApi();
  }

  async onButtonClick(){
    console.log(this.recipe);
    await this.storage.create();
    await this.storage.set('recipe',this.recipe);
    //call the load dataFromApi so that the new food stuff can replace the old one and new information is got
    await this.loadDataFromApi();
  }
  async loadDataFromApi(){
    try {
      const data = await this.dataService.getRecipeData();
      // Handle null or empty results
      this.myRecipes = data.meals || [];     
      console.log('API response:', data);
    } catch (error) {
      console.error('Error loading recipes:', error);
      this.myRecipes = [];//if there is an error the array will then be empty
      
    }
  }
  async toHomePage(){
    
    await this.router.navigateByUrl('/home');
  }

}
