import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map, Observable, retry, toArray } from 'rxjs';
import {Album, IAlbum} from './models/album';
import { responseParser } from './models/responseParser';

@Injectable({
  providedIn: 'root'
})
export class SpotifyserviceService 
{
  private client = 'da242dbc68b1456cad8fc0cbac5bac53';
  private secret = '9bc8abd41f054b05a471f15e512efc1a';
  private token!:string;
  private baseAddress = `https://api.spotify.com/v1/search?`;
  albums:Album[] = [];

  constructor(private http: HttpClient) 
  {
    this.getToken();
  }

  public getToken()
  {
    //Get a token from spotify when the service is created
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.client + ':' + this.secret),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    
    const authParams = new URLSearchParams();
    authParams.set('grant_type', 'client_credentials');
    
    this.http.post('https://accounts.spotify.com/api/token', authParams.toString(), httpOptions)
      .subscribe((response: any) => {
        this.token = response.access_token.toString();
      });
  }

  public getQuery(q: string):Observable<Album[]>
  {
    console.log("Token:\n" + this.token)
    const authHeader = {
      headers: new HttpHeaders({
        'Authorization':  `Bearer BQDrUDeAzTzBQqHvuJczYxlu8-zt6u4ijHOrpKWb2nA_x30sajtFV59HK45p4lkRrj-qfvFvVGTijQ1ea1YrB6wpsgoa-WLqbR0WkSpBxZjGBeQQ3DdF`,
        'Content-Type': 'application/json'
      })
    };
    const queryURL:string = this.baseAddress+q;
    return this.http.get<responseParser>(queryURL, authHeader).pipe(
      map(response => {
        const albums:Album[] = response.albums.items.map(item => ({
          title: item.name,
          artist: item.artists[0].name,
          coverArt: item.images[0].url
        }))
      return albums}));
    /*return this.http.get(queryURL, authHeader)
    .subscribe((response:any)=>
    {
      console.log(response)
      console.log("Response items")
      console.log(response.albums.items);
    })/*
    return  this.http.get<Album[]>(queryURL, authHeader);
    /*.subscribe((response:any)=>
    {
      console.log("Response items")
      console.log(response.albums.items);
    })*/
  }

  public getAlbums(query: string)
  {
    var response = this.getQuery(query);
  }
}

export interface IToken
{
  access_token: string,
  token_type: string,
  expires_in: number,
}

export class Token
{
  access_token!: string;
  token_type!: string;
  expires_in!: number;
}
