import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataLayoutComponent } from './data-layout.component';
import { DataflowlistComponent } from './dataflowlist/dataflowlist.component';

const routes: Routes = [
  { path:'index', component:DataLayoutComponent},
  {path:'showflow',component:DataflowlistComponent},
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataLayoutRoutingModule {
  
 }
