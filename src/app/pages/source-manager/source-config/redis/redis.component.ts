import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedisComponent implements OnInit {

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
