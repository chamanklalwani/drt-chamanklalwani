import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { FilterService } from './services/filter.service';
import { SorterService } from './services/sorter.service';
import { TrackByService } from './services/trackby.service';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { ModalModule } from './modal/modal.module';
import { GrowlerModule } from './growler/growler.module';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, ModalModule, GrowlerModule],
  exports: [RouterModule, HttpClientModule, ModalModule, GrowlerModule],
  declarations: [],
  providers: [SorterService, FilterService, DataService, TrackByService,
    { provide: 'Window', useFactory: () => window }
  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}



