import { Injectable } from '@angular/core';
import { createApi } from 'unsplash-js'
import { from, BehaviorSubject,  combineLatest, merge } from 'rxjs';
import { map, tap,  debounceTime, distinctUntilChanged, toArray, } from 'rxjs/operators';
import { Response } from './response.interface'

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  constructor() { }
  private perPage = 15
  private scrollTimes = 1

  private photosSubject = new BehaviorSubject([])
  searchTermSubject = new BehaviorSubject<string>('')
  favoritesSubject = new BehaviorSubject<boolean>(false)

  private api = createApi({
    accessKey: 'IFhRApYnAR6-xhvW9ty0SQa_CUjBGzzqkQU5fe-Alf4'
  })

  // These are my observables, which I combine to make the grid reactive
  searchResults$ = this.searchTermSubject.asObservable().pipe(
    debounceTime(400),
    distinctUntilChanged(),
    map(term => this.getPhotos(1, term || undefined)),
    toArray()
  )

  photosList$ = this.photosSubject.asObservable()
  favoriteValue$ = this.favoritesSubject.asObservable()
  photosWithSearch$ = merge(this.searchResults$, this.photosList$)

  photosWithSearchAndFavs$ = combineLatest(this.photosWithSearch$, this.favoriteValue$)
    .pipe(
      map(([response, showFavorites]) => 
        // @ts-ignore
        showFavorites ? {...response, results: response.results.filter(photo => photo.favorite)} : response
      )
    )

  getMorePhotos() {
    this.scrollTimes++
    this.getPhotos(this.scrollTimes, this.searchTermSubject.getValue())
  }

  private searchOrList(page:number, apiType: string, query: string) {
    const params = { query: query, perPage: this.perPage, page: page }
    return apiType === 'search' ? this.api.search.getPhotos(params) : this.api.photos.list(params)
  }

  private getPhotos(page: number, query?: string) {
    const apiType = !!query ? 'search' : 'list'
    return from(this.searchOrList(page, apiType, query || ''))
      .pipe(
        map(data => ({ ...data.response, apiType, query })),
        tap(response => this.manipulateSubject(response))
      ).subscribe()
  }

  private manipulateSubject(response:Response) { 
    const lastBatch = this.photosSubject.getValue() as unknown as Response

    if (response.apiType !== lastBatch.apiType || response.query && (response.query !== lastBatch.query)) {
      this.scrollTimes = 1
      this.photosSubject.next(response as any)
    } else {
      const allResults = lastBatch.results.concat(response.results)
      this.photosSubject.next({...lastBatch, results: allResults } as any)
    }    
  }
}

