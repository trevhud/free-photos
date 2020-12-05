import { Injectable } from '@angular/core';
import { createApi } from 'unsplash-js'
import { from, BehaviorSubject, Observable, Subject, combineLatest, forkJoin, merge, EMPTY } from 'rxjs';
import { map, tap, startWith, take, share, shareReplay, debounceTime, distinctUntilChanged, filter, switchMap, toArray, last } from 'rxjs/operators';
import { Response, Photo } from './response.interface'
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  constructor() { }
  private perPage = 15
  private scrollTimes = 1
  private photosSubject = new BehaviorSubject([])
  searchTermSubject = new BehaviorSubject<string>('')

  private api = createApi({
    accessKey: 'IFhRApYnAR6-xhvW9ty0SQa_CUjBGzzqkQU5fe-Alf4'
  })

  searchResults$ = this.searchTermSubject.asObservable().pipe(
    debounceTime(400),
    distinctUntilChanged(),
    tap(string => console.log('search string', string)),
    map(term => this.getPhotos(1, term || null)),
    toArray()
  )

  photosList$ = this.photosSubject.asObservable()

  photosWithSearch$ = merge(this.searchResults$, this.photosList$)
    .pipe(
      // startWith(this.getPhotos(1)),
      tap(results => console.log('combined', results))
    )

  getMorePhotos() {
    this.scrollTimes++
    this.getPhotos(this.scrollTimes, this.searchTermSubject.getValue())
  }

  private searchOrList(page:number, query?: string, apiType: string) {
    const params = { query: query, perPage: this.perPage, page: page }
    return apiType === 'search' ? this.api.search.getPhotos(params) : this.api.photos.list(params)
  }

  private getPhotos(page: number, query?: string) {
    const apiType = !!query ? 'search' : 'list'
    return from(this.searchOrList(page, query, apiType))
      .pipe(
        map(data => ({ ...data.response, apiType: apiType, query: query })),
        tap(response => this.manipulateSubject(response))
      ).subscribe()
  }

  private manipulateSubject(response:Response) {
    const lastBatch = this.photosSubject.getValue()
    const searchTerm = this.searchTermSubject.getValue()
    console.log('just returned: response, batch, term', response, lastBatch, searchTerm)

    if (response.apiType !== lastBatch.apiType || response.query && (response.query !== lastBatch.query)) {
      this.scrollTimes = 1
      this.photosSubject.next(response)
    } else {
      const allResults = lastBatch.results.concat(response.results)
      this.photosSubject.next({...lastBatch, results: allResults })
    }
    
  }


}

