import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { modbus, modbusdata } from 'interfaces';
import { Observable } from 'rxjs';
import { SpringbootService } from 'services';


@Component({
  selector: 'flink-modbus',
  templateUrl: './modbus.component.html',
  styleUrls: ['./modbus.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModbusComponent implements OnInit {

  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  public configlist$:Observable<modbus[]>;
  public pconfiglist :modbus[];
  public form_state:boolean= true;// 标识提交表格的状态 是创建新的还是修改 ture 是新增
  public is_ok: Observable<boolean>;
  public newconfig:modbus={
    port:0,
    url:"",
    id:0,
    data:"",
    types:"modbus"
  };

  fieldlist :modbusdata[];
  Tablename:string="";


  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    var fielda:modbusdata={
      type:0,
      slave_id:0,
      offset:0,
      datatype:0
    };
    this.fieldlist.push(fielda);

  }

  removeField(i:number, e: MouseEvent): void {
    e.preventDefault();
    this.fieldlist.splice(i,1);
  }

  submitForm(): void {
      console.log('submit',JSON.stringify(this.fieldlist) );

  }

  constructor(
    private readonly sp: SpringbootService
   // private readonly changeDetector: ChangeDetectorRef,// changeDetector 用于强制更新的注入
    ) {}

  ngOnInit(): void {
    this.fieldlist=[];
    this.addField();
    this.configlist$ = this.sp.showAllModbus();
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
    this.newconfig.data  = JSON.stringify(this.fieldlist)
      this.sp.newModbus(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
        )
    

  }

  deleteconfig(index :number){
    this.is_ok=this.sp.deleteModbus(this.pconfiglist[index].id);
    this.is_ok.subscribe( x=>{
      console.log(x + "---------is delete");
      //this.ngOnInit();
    });
    this.pconfiglist = this.pconfiglist.filter(item => item!=this.pconfiglist[index]);
 
  }
  clearnewconfig(){
    this.newconfig={
      port:0,
      url:"",
      id:0,
      data:"",
      types:"modbus"
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
