import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceManagerRoutingModule } from './source-manager-routing.module';
import { SourceManagerComponent } from './source-manager.component';


@NgModule({
  declarations: [
    SourceManagerComponent
  ],
  imports: [
    CommonModule,
    SourceManagerRoutingModule
  ]
})
export class SourceManagerModule { }
