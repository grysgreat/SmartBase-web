import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { rtmprtsp } from 'interfaces';
import { Observable } from 'rxjs';
import { SpringbootService } from 'services';

@Component({
  selector: 'flink-rtmp',
  templateUrl: './rtmp.component.html',
  styleUrls: ['./rtmp.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RtmpComponent implements OnInit {

  public configlist$: Observable<rtmprtsp[]>;
  public pconfiglist :rtmprtsp[];
  public form_state:boolean= true;// 标识提交表格的状态 是创建新的还是修改 ture 是新增
  public is_ok: Observable<boolean>;
  public newconfig: rtmprtsp={
    types:'rtmp',
    id:0,
    url :"",
  };
  
  constructor(private readonly sp: SpringbootService) { }

  ngOnInit(): void {
    this.configlist$ = this.sp.showRtmp();
    this.configlist$.subscribe( x=>{
      this.pconfiglist = x;
      console.log(x);
    }
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
      this.sp.newRtmp(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
        )
    }
    else{ 
      this.sp.updateRtmp(
        this.newconfig
      ).subscribe(x => {
        console.log(x);
        this.ngOnInit();
      }
        )
    }
  }

  deleteconfig(index :number){
    this.is_ok=this.sp.deleteRtmp(this.pconfiglist[index].id);
    this.is_ok.subscribe( x=>{
      console.log(x + "---------is delete");
      //this.ngOnInit();
    });
    this.pconfiglist = this.pconfiglist.filter(item => item!=this.pconfiglist[index]);
 
  }
  clearnewconfig(){
    this.newconfig={
      types:'rtmp',
      id:0,
      url :"",
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
