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


}
export enum Datatype{
  JDBC,
  HDFS,
  REDIS,
  KAFKA
}
class datatypeeumn{
  constructor(public text: string,public type: Datatype) {}
}