import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Tools } from 'interfaces';
import { DndDropEvent } from 'ngx-drag-drop';
import { Observable } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';


@Component({
  selector: 'flink-data-layout',
  templateUrl: './data-layout.component.html',
  styleUrls: ['./data-layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataLayoutComponent implements OnInit {

  tplModal: NzModalRef;
  code = 0;
  active = 0;
  tools$: Tools[];
  tool$: Observable<Tools>;
  offx = 0;
  offy = 0;
  lastDropEvent: DndDropEvent[] = [];
  currentNodeData:any;
  instance:any;
 

  constructor() {
  }

  getTools = (type: number) => {
      this.tools$ =  [{
        id: type,
        name: "string",
        version: "string",
      }];
      this.active = type;
  }

  ngOnInit() {
  }
  
  
}