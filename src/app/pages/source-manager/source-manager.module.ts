import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceManagerRoutingModule } from './source-manager-routing.module';
import { SourceManagerComponent } from './source-manager.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { SourceConfigComponent } from './source-config/source-config.component';
@NgModule({
  declarations: [
    SourceManagerComponent,
    SourceConfigComponent
  ],
  imports: [
    CommonModule,
    SourceManagerRoutingModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    FormsModule
  ]
})
export class SourceManagerModule { }
