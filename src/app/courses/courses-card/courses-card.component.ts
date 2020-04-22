import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ICourses } from '../../shared/interfaces';
import { TrackByService } from '../../core/services/trackby.service';

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.css']
})
export class CoursesCardComponent implements OnInit {

  @Input() courses: ICourses[] = [];

  constructor(public trackbyService: TrackByService) { }

  ngOnInit() {

  }

}
