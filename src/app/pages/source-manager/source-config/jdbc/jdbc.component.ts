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

}
