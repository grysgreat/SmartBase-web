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
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
