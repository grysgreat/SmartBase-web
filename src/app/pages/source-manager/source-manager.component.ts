import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { JarService } from 'services';
import { Router } from '@angular/router';

@Component({
  selector: 'flink-source-manager',
  templateUrl: './source-manager.component.html',
  styleUrls: ['./source-manager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceManagerComponent implements OnInit {
//
  constructor(
    private readonly jarService: JarService,
    private readonly router: Router
    ) {
  }

  /**
   * -sorceIp 192.168.10.1 
   * --sorcePort 3306 
   * --destUrl hdfs://hadoop102:8020/rng/out100.txt 
   * --saveUrl hdfs://hadoop102:8020/rng/ck 
   * --sorceUserName root 
   * --sorceUserPwd 123456 
   * --sorceBase test 
   * --sourceTable clicks
   */
  
  public jobinfo={
    sorceIp:"",
    sorcePort:0,
    destUrl:"",
    saveUrl:"",
    sorceUserName:"",
    sorceUserPwd:"",
    sorceBase:"",
    sourceTable:""
  }

  ngOnInit(): void {
  }
  
  submitForm(){
    console.log("Heello")
    console.log(this.returnArgs())

    this.jarService
    .runJob(
      "caeb036f-7f24-4c1c-af15-b051eb496fb6_smart-base-1.0-SNAPSHOT-jar-with-dependencies.jar",
      "com.star.smartBase.jobs.MysqlToText",
      "1",
      this.returnArgs(),
      "",
      ""
    )
    .subscribe(data => {
      this.router.navigate(['job', data.jobid]).then();
    });
  }

  returnArgs():string {
  
    return   '--destUrl '+this.jobinfo.destUrl.toString()+
    " --saveUrl "+this.jobinfo.saveUrl.toString()+
    " --sorceIp "+this.jobinfo.sorceIp.toString()+
    " --sorcePort "+this.jobinfo.sorcePort.toString()+
    " --sorceUserName "+ this.jobinfo.sorceUserName.toString()+
    " --sorceUserPwd "+this.jobinfo.sorceUserPwd.toString()+
    " --sourceTable "+this.jobinfo.sourceTable.toString()+
    " --sorceBase "+this.jobinfo.sorceBase.toString();
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


