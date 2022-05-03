import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SourceManagerRoutingModule } from './source-manager-routing.module';
import { SourceManagerComponent } from './source-manager.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { SourceConfigComponent } from './source-config/source-config.component';
import { SqlSqlComponent } from './sql-sql/sql-sql.component';
@NgModule({
  declarations: [
    SourceManagerComponent,
    SourceConfigComponent,
    SqlSqlComponent
  ],
  imports: [
    CommonModule,
    SourceManagerRoutingModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    FormsModule,
    NzCardModule
  ]
})
export class SourceManagerModule { }