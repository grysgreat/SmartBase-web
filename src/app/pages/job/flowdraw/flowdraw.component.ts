import { Component, OnInit, ChangeDetectionStrategy, QueryList, ViewChildren, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Baseinfo, dragbody, draglink, jobidflow, OneFlowchar, opcode } from 'interfaces';
import { Observable } from 'rxjs';
import { JobService, StorageService } from 'services';
import { SpringbootService } from 'services';
import { DragableBodyComponent } from '../../data-layout/jsplumb-flow/dragable-body/dragable-body.component';
import { DragoperationComponent } from '../../data-layout/jsplumb-flow/dragoperation/dragoperation.component';

declare let jsPlumb: any;


@Component({
  selector: 'flink-flowdraw',
  templateUrl: './flowdraw.component.html',
  styleUrls: ['./flowdraw.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowdrawComponent implements OnInit ,OnDestroy{

  @ViewChildren(DragableBodyComponent) panes!: QueryList<DragableBodyComponent>;
  @ViewChildren(DragoperationComponent) panes2!: QueryList<DragoperationComponent>;

  public jsonstr: string = "";
  public jobflow$:Observable<jobidflow> ;
  public jobflows:jobidflow;
  public jobid :string;

//#region 图形存储
  public dragbody_operation: dragbody[] = []; //⭐
  public dragbody_list:dragbody[]=[];          //⭐
  //存储连线的列表 只增加不删除就可以
  public linklist:draglink[] = [];                 //⭐
  //dragbody 的map 用uuid来标识
  public bodymap: Map<string, dragbody>;        //⭐
  public bodybaseinfo :Map<string,Baseinfo>;//⭐
  public opcodeinfo: Map<string,opcode>;//⭐
//#endregion




  constructor(
    private readonly jobService: JobService,
    private readonly sp: SpringbootService,
    private readonly st: StorageService,
    private readonly changeDetector: ChangeDetectorRef
    ) { 

    }
  ngOnDestroy(): void {
   
    this.cleargraph() ;
  }


  ngOnInit(): void {
    this.opcodeinfo = new Map();
    this.bodybaseinfo = new Map();
    this.bodymap = new Map();
    this.jobService.jobDetail$.subscribe((data)=>{
     
      this.jobid = data.jid;
      //this.jobflow$ =this.sp
      this.jobflow$ = this.sp.showJobbyID(this.jobid);
      this.jobflow$.subscribe(x =>{
     
        this.jobflows = x;
        this.showGraph() ;
      });
    }).unsubscribe();
  
  }
  showGraph()
  {

    this.InitFlow();
    this.changeDetector.detectChanges();
  }


  /**
   * 清楚绘图缓存
   */
  cleargraph(){
    for( let item of this.panes){
        item.shutdown();
    }
    for( let item of this.panes2){
      item.shutdown();
    }
  }
    /**
   * 从存储中 取出图像
   */
     InitFlow(){
      let ft2 :OneFlowchar=new OneFlowchar();
      ft2 =JSON.parse( this.jobflows.jsondata );
      console.log(ft2);
      let dragbody_list1 = <dragbody[]>ft2.dragbody_list;
      let linklist1 = <draglink[]>ft2.linklist;
      let dragbody_operation1= <dragbody[]>ft2.dragbody_operation;
      let bodymap1 =<Object>ft2.bodymap;
      let bodybaseinfo1 =<Object>ft2.bodybaseinfo;
      let opcodeinfo1 =<Object>ft2.opcodeinfo;
      this.dragbody_list=[];
      for(let item of dragbody_list1 ){
        this.dragbody_list.push(this.st.ObjectTodragbody(item));
      }
      this.linklist=[];
      for(let item of linklist1 ){
        this.linklist.push(<draglink>this.st.ObjectTodraglink(item));
      }
      this.dragbody_operation=[];
      for(let item of dragbody_operation1 ){
        this.dragbody_operation.push(this.st.ObjectTodragbody(item));
      }
      this.bodymap.clear();
      Object.entries(bodymap1).forEach(([k, v]) => {
        this.bodymap.set(k,this.st.ObjectTodragbody(v));
      });
      this.bodybaseinfo.clear();
      Object.entries(bodybaseinfo1).forEach(([k, v]) => {
        this.bodybaseinfo.set(k,<Baseinfo>v);
      });
      this.opcodeinfo.clear();
      Object.entries(opcodeinfo1).forEach(([k, v]) => {
        this.opcodeinfo.set(k,<opcode>v);
      });

      setTimeout(()=>this.sdf(),500);
    }



    sdf(){
      console.log(this.linklist)
      for(let link of this.linklist){
          var sourcebody =this.GetBodyById(link.source);
          var targetbody = this.GetBodyById(link.target);
          if(sourcebody!==undefined && targetbody!==undefined)
            this.connectEndpoint(sourcebody.endpoint,targetbody.inpoint);
      }
      this.changeDetector.detectChanges();
    }

    
  /**
   * 包装好的连接函数 只需要id值
   * @param from ba
   * @param to 
   */
  connectEndpoint(from: any, to: any) {
    jsPlumb.connect({ source: from,target:to,})  ;
  }


    /**
   * 通过id获取数据源信息
   * @param uuid 相应组件的id值
   */
     GetSourceByuuid(uuid:string):Baseinfo{
      let newbaseinfo:Baseinfo={
        types:'unknow',
        url:'',
        id:0,
      }
      for(let sourceitem of this.panes){
        if(sourceitem.data.id ==uuid){
          newbaseinfo  = sourceitem.localdatat;
          return newbaseinfo
        }
      }
      return newbaseinfo;
    }
  
    /**
     * 获取算子信息
     * @param uuid 组件id
     * @returns 
     */
    GetOperationByid(uuid:string):opcode{
      let newopcode :opcode={
        key :'unknow',
        type :'unknow'
      }
      for( let opitem of this.panes2){
        if(opitem.data.id ==uuid){
          newopcode = opitem.localdata;
          return newopcode;
        }
      }
      return newopcode;
    }



    /**
     * 
     * @param uuid id
     * @returns 返回组件类
     */
    GetBodyById(uuid:string):DragableBodyComponent|DragoperationComponent|undefined{
      for(let sourceitem of this.panes){
        if(sourceitem.data.id ==uuid){
            return sourceitem;
        }
      }
      for(let item of this.panes2){
        if(item.data.id==uuid){
          return item;
        }
      }
    }

}
