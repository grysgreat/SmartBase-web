import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { JarService } from 'services';
// import { Router } from '@angular/router';
import {DataBaseinfo }from 'interfaces'

@Component({
  selector: 'flink-sql-sql',
  templateUrl: './sql-sql.component.html',
  styleUrls: ['./sql-sql.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SqlSqlComponent implements OnInit {

  constructor(
    private readonly jarService: JarService,
    // private readonly router: Router
  ) { }

  public sourceinfo :DataBaseinfo={
    IP:"",
    Port:3306,
    UserName:"",
    UserPwd:"",
    Base:"",
    Table:"",
    Kafka:{
      Topic:"",
      Url:"",
    },
    HdfsUrl:""
  }

  public destinfo :DataBaseinfo={
    IP:"",
    Port:3306,
    UserName:"",
    UserPwd:"",
    Base:"",
    Table:"",
    Kafka:{
      Topic:"",
      Url:"",
    },
    HdfsUrl:""
  }
  ngOnInit(): void {
  }
  submitSqlKafka() {
    this.jarService
      .runJob(
        "65595251-2abe-441b-b8a2-3dcc8a8a156e_smart-base-1.0-SNAPSHOT-jar-with-dependencies.jar",
        "com.star.smartBase.jobs.MysqlToMysql",
        "1",
        this.returnsourceArgs(this.sourceinfo),
        "",
        ""
      )
      .subscribe(data => {
        // this.router.navigate(['job', data.jobid]).then();
        console.log(data.jobid)
      });
  }
  submitKafkaSql() {
    this.jarService
      .runJob(
        "65595251-2abe-441b-b8a2-3dcc8a8a156e_smart-base-1.0-SNAPSHOT-jar-with-dependencies.jar",
        "com.star.smartBase.jobs.KafkaToMysql",
        "1",
        this.returnsourceArgs(this.destinfo),
        "",
        ""
      )
      .subscribe(data => {
        // this.router.navigate(['job', data.jobid]).then();
        console.log(data.jobid)
      });
  }
  returnsourceArgs(arg:DataBaseinfo): string {
    return " --sorceIp "+arg.IP.toString()+
   " --sorcePort "+arg.Port.toString()+
   " --destUrl "+arg.Kafka.Url.toString()+
   " --sorceUserName "+arg.UserName.toString()+
   " --sorceUserPwd "+arg.UserPwd.toString()+
   " --sorceBase "+arg.Base.toString()+
   " --saveUrl "+arg.HdfsUrl.toString()+
   " --destTopic "+arg.Kafka.Topic.toString()+
   " --sourceTable "+arg.Table.toString();
  }

  teststring(){
    console.log(this.returnsourceArgs(this.sourceinfo));
    console.log(this.returnsourceArgs(this.destinfo));
  }

}

