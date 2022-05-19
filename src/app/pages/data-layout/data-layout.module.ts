import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLayoutRoutingModule } from './data-layout-routing.module';
import { DataLayoutComponent } from './data-layout.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DrawAreaComponent } from './draw-area/draw-area.component';
import { DataOperationComponent } from './data-operation/data-operation.component';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@ant-design/icons-angular';
import { DrowableModule } from './drowable/drowable.module';
import { JsplumbComponent } from './jsplumb/jsplumb.component';
import { DataFlowComponent } from './data-flow/data-flow.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { DragbodyComponent } from './jsplumb-flow/dragbody/dragbody.component';
import { JsplumbComponent2 } from './jsplumb-flow/jsplumb.component';
@NgModule({
  declarations: [
    DataLayoutComponent,
    DrawAreaComponent,
    DataOperationComponent,
    JsplumbComponent,
    DataFlowComponent,
    DragbodyComponent,
    JsplumbComponent2
  ],
  imports: [
    CommonModule,
    DataLayoutRoutingModule,
    DragDropModule,
    NzGridModule,
    NzCardModule,
    MatButtonModule,
    IconModule,
    DrowableModule,
    NzInputModule,
    NzModalModule,
    FormsModule,
    NzNotificationModule
  ]
})
export class DataLayoutModule { }
