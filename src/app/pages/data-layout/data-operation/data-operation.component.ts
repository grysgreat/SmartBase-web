import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-data-operation',
  templateUrl: './data-operation.component.html',
  styleUrls: ['./data-operation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataOperationComponent implements OnInit {
  componentList = [
    {label: '文本', type: 'text'},
    {label: '列表', type: 'list'},
    {label: '输入框', type: 'input'},
];
  constructor() { }

  ngOnInit(): void {
  }

}