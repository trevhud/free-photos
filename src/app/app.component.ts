import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotosService } from './photos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  favoritesOnly = false

  favoritesSubject = this.photosService.favoritesSubject

  constructor(private photosService: PhotosService) { }
}
