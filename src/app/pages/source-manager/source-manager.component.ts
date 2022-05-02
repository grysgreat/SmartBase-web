import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { JarService } from 'services';
@Component({
  selector: 'flink-source-manager',
  templateUrl: './source-manager.component.html',
  styleUrls: ['./source-manager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceManagerComponent implements OnInit {
//
  constructor(private readonly jarService: JarService) {
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
      "07c73334-546f-4e4b-8432-0af2a13da085_demo-0.0.1-SNAPSHOT-jar-with-dependencies.jar",
      "com.star.smartBase.jobs.FlinkCDCWithCustomerDeserialization",
      "1",
      this.returnArgs(),
      "",
      ""
    )
    .subscribe(data => {
      alert( data.jobid +"is running ")
      //this.router.navigate(['job', data.jobid]).then();
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
}


