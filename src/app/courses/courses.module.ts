import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTh, faList, faBookOpen, faBook, faPlus, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [CoursesRoutingModule, SharedModule, FontAwesomeModule],
  declarations: [CoursesRoutingModule.components]
})
export class CoursesModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faTh, faList, faBookOpen, faBook, faPlus, faEdit, faBars);
  }
}
