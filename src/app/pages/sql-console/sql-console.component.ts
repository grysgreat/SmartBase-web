import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'flink-sql-console',
  templateUrl: './sql-console.component.html',
  styleUrls: ['./sql-console.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SqlConsoleComponent implements OnInit {
  
  public jumpLink=this.sanitizer.bypassSecurityTrustResourceUrl("http://192.168.0.101:8082/"); // 信任该url
  
  constructor(private sanitizer:DomSanitizer) {
  
   }
  
  ngOnInit(): void {
  }

}
