import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  photos$ = this.photosService.photosWithSearchAndFavs$

  onScroll(): void {
    this.photosService.getMorePhotos()
  }

  constructor(private photosService: PhotosService) { }

}
