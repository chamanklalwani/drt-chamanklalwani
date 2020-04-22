import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      { path: 'details', component: CourseDetailComponent },
      {
        path: 'edit',
        component: CourseEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class CourseRoutingModule { 
  static components = [CourseComponent, CourseDetailComponent, CourseEditComponent];
}
