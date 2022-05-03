import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { JarService } from 'services';
import { Router } from '@angular/router';


@Component({
  selector: 'flink-sql-sql',
  templateUrl: './sql-sql.component.html',
  styleUrls: ['./sql-sql.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SqlSqlComponent implements OnInit {

  constructor(
    private readonly jarService: JarService,
    private readonly router: Router
  ) { }

  /*
   */

  public jobinfo = {
    sorceIp: "",
    destIP: "",
    sorcePort: 3306,
    destPort: 3306,
    sorceUserName: "",
    sorceUserPwd: "",
    destUserName: "",
    destUserPwd: "",
    sorceBase: "",
    sourceTable: "",
    destBase: "",
    destTable: ""
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.jarService
      .runJob(
        "07c73334-546f-4e4b-8432-0af2a13da085_demo-0.0.1-SNAPSHOT-jar-with-dependencies.jar",
        "com.star.smartBase.jobs.FlinkCDCWithCustomerDeserialization",
        "1",
        this.returnArgs(),
        "",
        ""
      )
      .subscribe(data => {
        this.router.navigate(['job', data.jobid]).then();
      });
  }

  returnArgs(): string {

    return "--sorceIp " + this.jobinfo.sorceIp.toString()    +
    "--sorcePort " + this.jobinfo.sorcePort.toString() +
    "--destPort " + this.jobinfo.destPort.toString() + 
    "--sorceUserName " + this.jobinfo.sorceUserName.toString() +
    "--sorceUserPwd " + this.jobinfo.sorceUserPwd.toString() +
    "--destUserName " + this.jobinfo.destUserName.toString() +
    "--destUserPwd " + this.jobinfo.destUserPwd.toString() +
    "--sorceBase " + this.jobinfo.sorceBase.toString() +
    "--sourceTable  " + this.jobinfo.sourceTable.toString() +
    "--destBase " + this.jobinfo.destBase.toString() +
    "--destTable " + this.jobinfo.destTable.toString() ;
  }

}
