import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceManagerComponent } from './source-manager.component';

const routes: Routes = [{ path: '', component:SourceManagerComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceManagerRoutingModule { }
