import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef} from '@angular/core';
import { JdbcConfig, Table } from 'interfaces';
import { SpringbootService } from 'services';
import { Observable } from 'rxjs';


@Component({
  selector: 'flink-jdbc-dynamic',
  templateUrl: './jdbc.component.html',
  styleUrls: ['./jdbc.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JdbcDynamicComponent implements OnInit {

  constructor( private readonly sp: SpringbootService,
    private readonly changeDetector: ChangeDetectorRef,// changeDetector 用于强制更新的注入
     ) { 

  }

   public configlist$: Observable<JdbcConfig[]>;
   public pconfiglist :JdbcConfig[];
   public form_state:boolean= true;// 标识提交表格的状态 是创建新的还是修改 ture 是新增
   public is_ok: Observable<boolean>;

   public Table$ :Observable<Table>;
   public Table:Table;
   public Javacontext:string="";
   public newconfig: JdbcConfig={
    types:'Jdbc',
    id :0,
    driveClassName :"",
    url:"",
    port:0,
    username: "",
    password: "",
    basename:"",
    tablename:"",
    connectorType:"",
    sql:"",
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
    if(this.form_state){//如果是新加入的情况
      this.sp.newJdbcConfig(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
        )
    }
    else{ //否则是更新项目
      this.sp.updateJdbcConfig(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
      )
    }
  }

  GetJavaClass(index :number){
    this.Table$ = this.sp.GetJavaClassBySQl(this.pconfiglist[index].id);
    
    this.Table$.subscribe( x=>{
       this.Table= x;
       console.log(x);
       this.Javacontext = this.Table.javaContext;
       this.changeDetector.detectChanges();//标记更新
    });
    this.pconfiglist = this.pconfiglist.filter(item => item!=this.pconfiglist[index]);
 
  }
  //重置填充配置清零
  clearnewconfig(){
    this.newconfig={
      types:'Jdbc',
      id :0,
      driveClassName :"",
      url:"",
      port:0,
      username: "",
      password: "",
      basename:"",
      tablename:"",
      connectorType:"",
      sql:"",
     };
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
