import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { SqlConsoleComponent } from './sql-console.component';
const routes: Routes = [  { path: '', component:SqlConsoleComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlConsoleRoutingModule { }
