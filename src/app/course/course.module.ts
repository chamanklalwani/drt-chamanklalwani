// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules imports
import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '../shared/shared.module';

// third party imports
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faBars } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [CourseRoutingModule.components],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class CourseModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faEdit, faBars);
  }
}
