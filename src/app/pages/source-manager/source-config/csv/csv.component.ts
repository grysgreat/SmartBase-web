import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
