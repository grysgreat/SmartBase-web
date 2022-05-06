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

}
