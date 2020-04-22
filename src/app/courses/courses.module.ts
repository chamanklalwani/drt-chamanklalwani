import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './courses-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTh, faList, faBookOpen, faBook } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [CustomersRoutingModule, SharedModule, FontAwesomeModule],
  declarations: [CustomersRoutingModule.components]
})
export class CoursesModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faTh, faList, faBookOpen, faBook);
  }
}
