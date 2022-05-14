import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { JdbcConfig } from 'interfaces';
import { SpringbootService } from 'services';
import { Observable } from 'rxjs';

@Component({
  selector: 'flink-jdbc',
  templateUrl: './jdbc.component.html',
  styleUrls: ['./jdbc.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JdbcComponent implements OnInit {

  constructor( private readonly sp: SpringbootService ) { 

  }

   public configlist$: Observable<JdbcConfig[]>;
   public pconfiglist :JdbcConfig[];
   public form_state:boolean= true;// 标识提交表格的状态 是创建新的还是修改 ture 是新增
   public is_ok: Observable<boolean>;
   public newconfig: JdbcConfig={
    url:"",
    connectorType:"",
    username:"",
    password:"",
    driveClassName:"",
    id:0,
    sql:""
   };
   
  
  
  ngOnInit(): void {
    this.configlist$ = this.sp.SearchAllJdbc();
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
      this.sp.newJdbcConfig(
        this.newconfig.url,
        this.newconfig.username,
        this.newconfig.password,
        this.newconfig.connectorType,
        this.newconfig.driveClassName
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
    this.is_ok=this.sp.deleteJdncConfig(this.pconfiglist[index].id);
    this.is_ok.subscribe( x=>{
      console.log(x + "---------is delete");
      //this.ngOnInit();
    });
    this.pconfiglist = this.pconfiglist.filter(item => item!=this.pconfiglist[index]);
 
  }
  clearnewconfig(){
    this.newconfig={
      url:"",
      connectorType:"",
      username:"",
      password:"",
      driveClassName:"",
      id:0,
      sql:""
     };
  }
  changeconfig(index  :number){
      this.newconfig = this.pconfiglist[index];
      this.showModal();
  }

}
