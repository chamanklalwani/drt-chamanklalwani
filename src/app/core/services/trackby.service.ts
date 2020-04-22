import { Injectable } from '@angular/core';

import { ICourses } from '../../shared/interfaces';

@Injectable()
export class TrackByService {

  course(index: number, course: ICourses) {
    return course.id;
  }
}
