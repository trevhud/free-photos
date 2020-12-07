import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, tap } from 'rxjs/operators';
import { DialogComponent } from '../dialog/dialog.component';
import { PhotosService } from '../photos.service';
import { Photo } from '../response.interface';

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

  openDialog(photo:Photo):void {
    this.dialog.open(DialogComponent, {
      data: {...photo},
      height: '95vh',
      width: '95vw'
    })
  }

  constructor(private photosService: PhotosService,
              private dialog: MatDialog) { }

}
