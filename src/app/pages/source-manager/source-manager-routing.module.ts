import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceManagerComponent } from './source-manager.component';
import { SourceConfigComponent } from './source-config/source-config.component';

const routes: Routes = [
  { path: '', component:SourceManagerComponent},
{path:'source-config',component:SourceConfigComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceManagerRoutingModule { }
