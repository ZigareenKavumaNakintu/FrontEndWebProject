import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Observable, lastValueFrom } from 'rxjs';
import {Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  food: any;
  constructor(private httpClient: HttpClient, private storage: Storage) { }
   
  
  async getRecipeData(): Promise<{ meals: any[] | null }> {
    await this.storage.create();
    this.food = await this.storage.get('recipe');  // Changed key
    
    if (!this.food) {
      console.warn('No meal ID found in storage');
      return { meals: null };
    }
  
    // Changed endpoint to lookup.php?i=
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.food}`;
    console.log('API URL:', apiUrl);
    
    const response = await lastValueFrom(
      this.httpClient.get<{ meals: any[] | null }>(apiUrl)
    );
    
    return response || { meals: null };
  }
}