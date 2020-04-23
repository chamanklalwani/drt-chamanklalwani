import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SorterService } from '../../core/services/sorter.service';
import { TrackByService } from '../../core/services/trackby.service';
import { ICourse, DurationUnit } from '../../shared/interfaces';

@Component({
  selector: 'app-courses-grid',
  templateUrl: './courses-grid.component.html',
  styleUrls: ['./courses-grid.component.css']
})
export class CoursesGridComponent implements OnInit {

  @Input() courses: ICourse[] = [];
  // enum variable for Course Duration Units
  durationUnit = DurationUnit;
  
  constructor(private sorterService: SorterService, public trackbyService: TrackByService) { }

  ngOnInit() {

  }

  sort(prop: string) {
    this.sorterService.sort(this.courses, prop);
  }

}
