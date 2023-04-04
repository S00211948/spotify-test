export class Album
{
    title!:string;
    artist!:string;
    coverArt!:string;
    /*constructor(_title:string, _artist:string, _coverArt:string)
    {
        this.title = _title;
        this.artist = _artist;
        this.coverArt = _coverArt;
    }*/
    constructor(data:any)
    {
        this.title = data.name,
        this.artist = data.artists[0].name,
        this.coverArt = data.images[0].url
    }
}

export interface IAlbum
{
    title:string,
    artist:string,
    coverArt:string,
}