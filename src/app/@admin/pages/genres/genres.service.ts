import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import {ADD_GENRE, BLOCK_GENRE} from '@graphql/operations/mutation/genre';
import { map } from 'rxjs/operators';
import { MODIFY_GENRE } from '@graphql/operations/mutation/genre';
@Injectable({
  providedIn: 'root'
})
export class GenresService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  add(genre: string){
    return this.set(
      ADD_GENRE,
      {
        genre
      },
      {}).pipe(map((result: any) => {
      return result.addGenre;
      }));

  }
  update(id: string, genre: string){
    return this.set(
      MODIFY_GENRE,
      {
        id,
        genre
      },
      {}).pipe(map((result: any) => {
      return result.updateGenre;
      }));

  }


  block(id: string){
    return this.set(
      BLOCK_GENRE,
      {
        id,
      },
      {}).pipe(map((result: any) => {
      return result.blockGenre;
      }));

  }
}
