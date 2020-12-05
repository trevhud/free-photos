import { Injectable } from '@angular/core';
import { createApi } from 'unsplash-js'
import { from, BehaviorSubject, Observable } from 'rxjs';
import { map, tap, startWith, take, share, shareReplay } from 'rxjs/operators';
import { Response, Photo } from './response.interface'
import { ApiResponse } from 'unsplash-js/dist/helpers/response';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  constructor() { }
  private perPage = 15
  private photosSubject = new BehaviorSubject([])

  private api = createApi({
    accessKey: 'IFhRApYnAR6-xhvW9ty0SQa_CUjBGzzqkQU5fe-Alf4'
  })

  photosList$ = this.photosSubject.asObservable().pipe(
    startWith(this.getPhotos(1))
  )

  getMorePhotos(page:number) {
    this.getPhotos(page)
  }

  private getPhotos(page:number) {
    return from(this.api.photos.list({ perPage: this.perPage, page: page }))
      .pipe(
        map(data => data.response.results),
        tap(newPhotos => {
          console.log('just returned', newPhotos)
          const currentBatch = this.photosSubject.getValue()
          this.photosSubject.next(currentBatch.concat(newPhotos))
        }),
        take(1),
        shareReplay(1)
      ).subscribe()
  }

}

