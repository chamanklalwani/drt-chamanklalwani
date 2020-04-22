import { Injectable } from '@angular/core';

import { ICourse } from '../../shared/interfaces';

@Injectable()
export class TrackByService {

  course(index: number, course: ICourse) {
    return course.id;
  }
}
