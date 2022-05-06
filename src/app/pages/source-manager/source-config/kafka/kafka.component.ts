import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KafkaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
