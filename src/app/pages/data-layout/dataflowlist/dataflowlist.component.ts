import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { Baseinfo, dragbody, draglink, jobidflow, OneFlowchar, opcode } from 'interfaces';
import { Observable } from 'rxjs';
import { SpringbootService, StorageService } from 'services';
import { DragableBodyComponent } from '../jsplumb-flow/dragable-body/dragable-body.component';
import { JarService } from 'services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DragoperationComponent } from '../jsplumb-flow/dragoperation/dragoperation.component';

declare let jsPlumb: any;


@Component({
  selector: 'flink-dataflowlist',
  templateUrl: './dataflowlist.component.html',
  styleUrls: ['./dataflowlist.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataflowlistComponent implements OnInit {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  @ViewChildren(DragableBodyComponent) panes!: QueryList<DragableBodyComponent>;
  @ViewChildren(DragoperationComponent) panes2!: QueryList<DragoperationComponent>;

  public jsonstr: string = "";
  public jobflow$:Observable<jobidflow[]> ;
  public jobflows:jobidflow[];

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
    private readonly sp: SpringbootService,
    private readonly st: StorageService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly jarService: JarService,
    private readonly notification: NzNotificationService,

    ) { 
      this.jobflow$ = this.sp.showAllJobs();
      this.jobflow$.subscribe(x =>{
     
        this.jobflows = x;
        this.changeDetector.detectChanges();
      }
       
      );
    }

  ngOnInit(): void {
    this.opcodeinfo = new Map();
    this.bodybaseinfo = new Map();
    this.bodymap = new Map();
  }
  showGraph(i:number)
  {
    this.cleargraph();
    this.InitFlow(i);
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
     InitFlow(jobindex:number){
      let ft2 :OneFlowchar=new OneFlowchar();
      ft2 =JSON.parse( this.jobflows[jobindex].jsondata );
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



    public getNext(s:string):number[]{
      let next=[];
      next[0]=0;
      for(let i=1,j=0;i<s.length;i++){
              while(j>0&&s[j]!=s[i]){
                      j=next[j-1];
                      if(s[j]==s[i]){
                              j++;
                      }
                      next[i]=j;
              }
      }
      return next;
  
  }
  
  private subStringIndexKMP(source:string,target:string):number{
       if(target.length>source.length||!source||!target){
           return -1;
       }
       let res=-1;
       let i=0;
       let next:number[]=this.getNext(source);
       while(i<=source.length-target.length){
           if(source[i]==target[0]){
              let temp=true;
              for(let j=0;j<target.length;j++){
                  if(source[i+j]!=target[j]){
                      temp=false;
                      i+=next[j+1];    //i向前移动j+1跳过哨兵
                      break;
                  }
              }
              if(temp){
                  res=i;
                  return res
              }
          }else{
              i++;
          }
       }
       return res;
   }


   //消息通知函数
notify(data: any) {
  this.notification.blank(
    'Job Submit Successful!!!',
    'clink the left buttom to know' + data.toString()
  );
}


    //提交生成的json 任务
  submitJson( i :number) {
    
    this.jsonstr =  this.jobflows[i].jobjson ;

    console.log(this.jsonstr);
    if(this.subStringIndexKMP(this.jsonstr,"^Photo")!==-1){//dirty code 找到
      this.jarService
      .runJob(
        "c57eac93-0d21-4f3b-9165-1f1183870a35_NewOpTest-1.0-SNAPSHOT-jar-with-dependencies.jar",
        "com.photo.PhotoSource",
        "1",
        "",
        "",
        ""
      )
      .subscribe(data => {
        // this.router.navigate(['job', data.jobid]).then();
        this.notify(data.jobid);

      });
    }else{
      this.jarService
      .runJob(
        "fdc8ba1f-8751-40c6-8d92-d01bbbb4ddd1_BaseHub-1.0-SNAPSHOT-jar-with-dependencies.jar",
        "com.star.JobController",
        "1",
        "--jobJson " + this.jsonstr + " --saveUrl hdfs://hadoop102:8020/rng/ck",
        "",
        ""
      )
      .subscribe(data => {
        // this.router.navigate(['job', data.jobid]).then();
        this.notify(data.jobid);
      });
    }
   
  }




    sdf(){
      console.log(this.linklist)
      for(let link of this.linklist){
          var sourcebody =this.GetBodyById(link.source);
          var targetbody = this.GetBodyById(link.target);
          if(sourcebody!==undefined && targetbody!==undefined)
            this.connectEndpoint(sourcebody.endpoint,targetbody.inpoint);
      }
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
