import { Component } from '@angular/core';
import { Album } from './spotify/models/album';
import { SpotifyserviceService } from './spotify/spotifyservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spotify-test';
  albums:Album[] = [];
  message:string = "";

  constructor(private spotifyService:SpotifyserviceService){
  }

  ngOnInit(){
    this.spotifyService.getAlbums("q=Divide&type=album")
    .subscribe({
      next:(value:Album[]) => this.albums = value,
      complete:()=>console.log("Spotify Service Finished"),
      error:(mess:string) => this.message = mess
    })
  }

  searchAlbums(query:string):boolean
  {
    //Call the get albums method with the inputted query
    console.log("Searching for: "+query);
    this.spotifyService.getAlbums(`q=${query}&type=album`)
    .subscribe({
      next:(value:Album[]) => this.albums = value,
      complete:()=>console.log("Spotify Service Search Finished"),
      error:(mess:string) => this.message = mess
    })
    return true;
  }
}
