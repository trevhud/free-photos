import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  
  searchTermSubject = this.photosService.searchTermSubject

  constructor(private photosService: PhotosService) { }


}
