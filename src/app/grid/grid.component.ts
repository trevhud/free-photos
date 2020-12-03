import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GridService } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  photosList$ = this.gridService.photosList$

  constructor(private gridService: GridService) { }

}
