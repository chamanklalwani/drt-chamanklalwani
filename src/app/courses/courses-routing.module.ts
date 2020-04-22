import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CoursesCardComponent } from './courses-card/courses-card.component';
import { CoursesGridComponent } from './courses-grid/courses-grid.component';

const routes: Routes = [
  { path: '', component: CoursesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {
  static components = [CoursesComponent, CoursesCardComponent, CoursesGridComponent];
}
