import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  scrollTimes:number = 0
  photosList$ = this.photosService.photosList$

  onScroll(): void {
    this.scrollTimes++
    console.log('scrolltimes', this.scrollTimes)
    this.photosService.getMorePhotos(this.scrollTimes+1)
  }

  constructor(private photosService: PhotosService) { }

}
