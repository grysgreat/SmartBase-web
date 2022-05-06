import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-hdfs',
  templateUrl: './hdfs.component.html',
  styleUrls: ['./hdfs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HdfsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
