import { Album, IAlbum } from "./album"

export class responseParser
{
    albums!:nestedItems
}

export class nestedItems
{
    items!:nestedAlbum[]
}

export class nestedAlbum
{
    name!:string;
    images!:nestedimages[];
    artists!:nestedArtists[]
}

export class nestedArtists
{
    name!:string
}
export class nestedimages
{
    url!:string
}