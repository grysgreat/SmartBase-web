import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpringbootService } from 'services';
import { Observable } from 'rxjs';
import { Kafka } from 'interfaces';
@Component({
  selector: 'flink-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KafkaComponent implements OnInit {
  public configlist$: Observable<Kafka[]>;
  public pconfiglist :Kafka[];
  public form_state:boolean= true;// 标识提交表格的状态 是创建新的还是修改 ture 是新增
  public is_ok: Observable<boolean>;
  public newconfig: Kafka={
   url:"",
   port:0,
   topic:"",
   id:0,
  };
  
  constructor(private readonly sp: SpringbootService) { }

  ngOnInit(): void {
    this.configlist$ = this.sp.ShowallKafka();
    this.configlist$.subscribe( x=>
        this.pconfiglist = x
    );
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

  createnewconfig(){
    if(this.form_state){
      this.sp.newKafka(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
        )
    }
    else{ 
      this.sp.updateKafka(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
        )
    }
  }

  deleteconfig(index :number){
    this.is_ok=this.sp.deleteKafkaConfig(this.pconfiglist[index].id);
    this.is_ok.subscribe( x=>{
      console.log(x + "---------is delete");
      //this.ngOnInit();
    });
    this.pconfiglist = this.pconfiglist.filter(item => item!=this.pconfiglist[index]);
 
  }
  clearnewconfig(){
    this.newconfig={
      url:"",
      port:0,
      topic:"",
      id:0
     };
  }
  changeconfig(index  :number){
      this.newconfig = this.pconfiglist[index];
      this.showModal();
  }

  //更新相应配置
  updateconfig(i:number){
    this.newconfig = this.pconfiglist[i];
    this.form_state=false;
    this.showModal();
  }
  //创建新的配置
  createconfig(){
    this.clearnewconfig();
    this.form_state=true;
    this.showModal()
  }
}
