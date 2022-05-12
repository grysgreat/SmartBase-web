import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'flink-jdbc',
  templateUrl: './jdbc.component.html',
  styleUrls: ['./jdbc.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JdbcComponent implements OnInit {

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
