import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { UserManagerComponent } from './user-manager.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import {NzModalModule} from  'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    UserManagerComponent
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    NzCollapseModule,
    NzModalModule,
    FormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class UserManagerModule { }
