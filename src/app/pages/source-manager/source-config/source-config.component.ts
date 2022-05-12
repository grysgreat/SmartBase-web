import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flink-source-config',
  templateUrl: './source-config.component.html',
  styleUrls: ['./source-config.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SourceConfigComponent implements OnInit {
//这里用ngSwitch 的方法十分巧妙
  public sourcdatatype :datatypeeumn;
  public destdatatype:datatypeeumn;
  sourcetype=Datatype;
  constructor() {
    this.sourcdatatype=new datatypeeumn("Hello",Datatype.REDIS);
    this.destdatatype=new datatypeeumn("Hello",Datatype.JDBC);
  }
  ngOnInit(): void {
    
  }
  setsourcType(type: Datatype) {
    this.sourcdatatype.type = type;
  }
  setdstType(type: Datatype) {
    this.destdatatype.type = type;
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
export enum Datatype{
  JDBC,
  HDFS,
  REDIS,
  KAFKA
}
class datatypeeumn{
  constructor(public text: string,public type: Datatype) {}
  tostring() {
    switch(this.type){
      case Datatype.HDFS: return "HDFS";
      case Datatype.JDBC: return "JDBC";
      case Datatype.KAFKA: return "KAFKA";
      case Datatype.REDIS: return "REDIS";
      default: return "UNKNOW";
      }
  }
}