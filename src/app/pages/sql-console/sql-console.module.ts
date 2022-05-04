import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlConsoleRoutingModule } from './sql-console-routing.module';
import { SqlConsoleComponent } from './sql-console.component';


@NgModule({
  declarations: [
    SqlConsoleComponent
  ],
  imports: [
    CommonModule,
    SqlConsoleRoutingModule
  ]
})
export class SqlConsoleModule { }
