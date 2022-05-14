import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpringbootService } from 'services';
import { Observable } from 'rxjs';
import { redis } from 'interfaces';
@Component({
  selector: 'flink-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedisComponent implements OnInit {
  public configlist$: Observable<redis[]>;
  public pconfiglist :redis[];
  public form_state:boolean= true;// 标识提交表格的状态 是创建新的还是修改 ture 是新增
  public is_ok: Observable<boolean>;
  public newconfig: redis={
    id:0,
    username: "",
    password :"",
    url :"",
    Port:0,
    tablename : "",
  };
  
  constructor(private readonly sp: SpringbootService) { }

  ngOnInit(): void {
    this.configlist$ = this.sp.showAllRedis();
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
      this.sp.newRedis(
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
    this.is_ok=this.sp.deleteRedis(this.pconfiglist[index].id);
    this.is_ok.subscribe( x=>{
      console.log(x + "---------is delete");
      //this.ngOnInit();
    });
    this.pconfiglist = this.pconfiglist.filter(item => item!=this.pconfiglist[index]);
 
  }
  clearnewconfig(){
    this.newconfig={
      id:0,
      username: "",
      password :"",
      url :"",
      Port:0,
      tablename : "",
     };
  }
  changeconfig(index  :number){
      this.newconfig = this.pconfiglist[index];
      this.showModal();
  }
}
