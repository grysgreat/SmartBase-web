import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'flink-dragbody',
  template: `
  <div class='pa' id={{data.id}} style='top:{{data.top}}px;left:{{data.left}}px'>
  <div class='panel panel-default panel-node panel-info'>
  <div [id]="data.id+'head'" class='panel-heading'>
  <i class='fa fa-calendar-times-o' aria-hidden='true'></i> 
  {{data.name}}
  <span class='delete-node pull-right' data-type='deleteNode' data-id='{{data.id}}'>
    X</span>
  </div>
  <ul class='list-group'>
    <li id='{{data.id}}-onWorkTime'  class='list-group-item panel-node-list'>
      源数据源
    </li>
    <li id='{{data.id}}-offWorkTime'  class='list-group-item panel-node-list'>
    数据类型：mysql
    </li></ul>
  </div>
  </div>
  `,
  styleUrls: ['./dragbody.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragbodyComponent implements OnInit {
  @Input() data:any;
  constructor() { }

  ngOnInit(): void {
  }

}
