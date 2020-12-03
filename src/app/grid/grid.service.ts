import { Injectable } from '@angular/core';
import { createApi } from 'unsplash-js'
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GridService {
  constructor() { }

  api = createApi({
    accessKey: 'IFhRApYnAR6-xhvW9ty0SQa_CUjBGzzqkQU5fe-Alf4'
    // headers: { 'accept-version' : 'v1' }
  })

  photosList$ = from(this.api.photos.list({ perPage: 30, page: 1 }))
    .pipe(
      tap(data => console.log(data)),
      map(data => data.response?.results)
    )

}
