import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ICourse } from '../../shared/interfaces';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: ICourse;

  constructor(private route: ActivatedRoute, 
    private dataService: DataService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. 
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.dataService.getCourse(id)
          .subscribe((course: ICourse) => {
            this.course = course;
          });
      }
    });
  }
}
