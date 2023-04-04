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
    this.spotifyService.getQuery("q=Divide&type=album")
    .subscribe({
      next:(value:Album[]) => this.albums = value,
      complete:()=>console.log("Spotify Service Finished"),
      error:(mess) => this.message = mess
    })
  }
}
