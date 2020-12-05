import { Injectable } from '@angular/core';
import { createApi } from 'unsplash-js'
import { from, BehaviorSubject } from 'rxjs';
import { map, tap, startWith, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  constructor() { }
  private perPage = 15

  api = createApi({
    accessKey: 'IFhRApYnAR6-xhvW9ty0SQa_CUjBGzzqkQU5fe-Alf4'
  })

  photosSubject = new BehaviorSubject([])

  photosList$ = this.photosSubject.asObservable().pipe(
    startWith(this.getPhotos(1))
  )

  private getPhotos(page:number) {
    return from(this.api.photos.list({ perPage: this.perPage, page: page }))
      .pipe(
        map(data => data.response.results),
        tap(newPhotos => {
          console.log('just returned', newPhotos)
          const currentBatch = this.photosSubject.getValue()
          this.photosSubject.next(currentBatch.concat(newPhotos))
        }),
        take(1)
      ).subscribe()
  }

  getMorePhotos(page:number) {
    this.getPhotos(page)
  }

}

