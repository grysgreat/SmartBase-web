import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-source-config',
  templateUrl: './source-config.component.html',
  styleUrls: ['./source-config.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
