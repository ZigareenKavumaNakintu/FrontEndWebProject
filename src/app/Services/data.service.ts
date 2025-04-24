import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import {Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  food: any;
  artist: string = "";
  title: string ="";
  constructor(private httpClient: HttpClient, private storage: Storage) { }
   
  /* A promise is used so that we can use await and first get the id number from storage
    the promise returns an object meals that it stores in an array- if empty it returns null
    lastValueFrom changes the HTTP response from an observable to a promise 
  */
  async getRecipeData(): Promise<{ meals: any[] | null }> {
    await this.storage.create();
    this.food = await this.storage.get('recipe');  
    
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.food}`;
    console.log('API URL:', apiUrl);
    
    const response = await lastValueFrom(
      this.httpClient.get<{ meals: any[] | null }>(apiUrl)
    );
    return response || { meals: null };
  }

  /*Made this a promise instead of an observable because the program has to first get the value from the storage-using await
  for it to continue and get code from the api. */
  async getSongData():Promise<any> {
    await this.storage.create();
    this.artist = await this.storage.get('artist');
    this.title = await this.storage.get('title');

   //using encodeURIComponent incase the user inputs spaces or special characters-firstValuefrom changes what the api brings- from Observable to a promise
    return firstValueFrom(this.httpClient.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(this.artist)}/${encodeURIComponent(this.title)}`));
  }
}