import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseEditComponent } from '../course-edit/course-edit.component';
import { LoggerService } from '../../core/services/logger.service';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CourseEditComponent> {

  constructor(private logger: LoggerService) {}

  canDeactivate(
    component: CourseEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.logger.log(`CourseId: ${route.parent.params['id']} URL: ${state.url}`);

    return component.canDeactivate();
  }
}
