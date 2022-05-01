import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-source-manager',
  templateUrl: './source-manager.component.html',
  styleUrls: ['./source-manager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
