import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Hdfs } from 'interfaces';
import { SpringbootService } from 'services';
import { Observable } from 'rxjs';
@Component({
  selector: 'flink-hdfs',
  templateUrl: './hdfs.component.html',
  styleUrls: ['./hdfs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HdfsComponent implements OnInit {


  public configlist$: Observable<Hdfs[]>;
  public pconfiglist :Hdfs[];
  public form_state:boolean= true;// 标识提交表格的状态 是创建新的还是修改 ture 是新增
  public is_ok: Observable<boolean>;
  public newconfig: Hdfs={
   url:"",
   id:0,
  };
  constructor(private readonly sp: SpringbootService ) { }
  ngOnInit(): void {
    this.configlist$ = this.sp.showAllHdfs();
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
      this.sp.newHdfs(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
        )
    }
    else{ 
    }
  }

  deleteconfig(index :number){
    this.is_ok=this.sp.deleteHDFS(this.pconfiglist[index].id);
    this.is_ok.subscribe( x=>{
      console.log(x + "---------is delete");
      //this.ngOnInit();
    });
    this.pconfiglist = this.pconfiglist.filter(item => item!=this.pconfiglist[index]);
 
  }
  clearnewconfig(){
    this.newconfig={
      url:"",
      id :0
     };
  }
}
