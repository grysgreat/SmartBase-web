import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceManagerComponent } from './source-manager.component';
import { SourceConfigComponent } from './source-config/source-config.component';
import { SqlSqlComponent } from './sql-sql/sql-sql.component';

const routes: Routes = [
  { path: '', component:SourceManagerComponent},
{path:'source-config',component:SourceConfigComponent},
{path:'sql-sql',component:SqlSqlComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceManagerRoutingModule { }
