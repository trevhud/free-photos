import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotosService } from './photos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'free-photos';

  favoritesSubject = this.photosService.favoritesSubject

  constructor(private photosService: PhotosService) { }
}
