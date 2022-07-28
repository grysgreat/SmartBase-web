import {
  Component, OnInit, ChangeDetectionStrategy,
  QueryList, ChangeDetectorRef, ViewChildren
} from '@angular/core';
import * as uuid from 'uuid'; //随机数的生成
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Baseinfo, dragbody, Hdfs, jobidflow, Kafka, modbus, OneFlowchar, opcode, opcua, redis, rtmprtsp, Socket } from 'interfaces';
import {  JarService, SpringbootService, StorageService } from 'services';
import { DragableBodyComponent } from './dragable-body/dragable-body.component';
import { DragoperationComponent } from './dragoperation/dragoperation.component';
import { JdbcConfig ,JobDataFlow} from 'interfaces';
import { Observable } from 'rxjs';
import { draglink } from 'interfaces';
declare let jsPlumb: any;
declare let $      : any;

@Component({
  selector: 'flink-jsplumb2',
  templateUrl: './jsplumb.component.html',
  styleUrls: ['./jsplumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsplumbComponent2 implements OnInit {
  @ViewChildren(DragableBodyComponent) panes!: QueryList<DragableBodyComponent>;
  @ViewChildren(DragoperationComponent) panes2!: QueryList<DragoperationComponent>;

  //TODO: 针�?�jar包id�??改这�??
  private JarID :string ="00a02105-f7c7-4734-b1e6-090f8edafffb_11.jar";
  area = 'drop-bg';
  areaId = '#' + this.area;
  public htmldragpan:string="";
  //接受数据的list
  public jsonstr: string = "";
  public Jdbclist$: Observable<JdbcConfig[]>;
  public Jdbclist: JdbcConfig[];
  public Hdfslist$: Observable<Hdfs[]>;
  public Hdfslist: Hdfs[];
  public Kafkalist$: Observable<Kafka[]>;
  public Kafkalist: Kafka[];
  public Redislist$: Observable<redis[]>;
  public Redislist: redis[];
  public Socketlist$: Observable<Socket[]>;
  public Socketlist: Socket[];
  public RtmpList:rtmprtsp[];
  public RtspList:rtmprtsp[];
  public RtmpList$:Observable<rtmprtsp[]>;
  public RtspList$:Observable<rtmprtsp[]>;
  public ModbusList$:Observable<modbus[]>;
  public ModbusList:modbus[];
  public Opcualist$:Observable<opcua[]>;
  public Opcualist:opcua[];
  public jobflow$:Observable<jobidflow[]> ;
  public jobflows:jobidflow[];

//#region 图形存储
  public dragbody_operation: dragbody[] = []; //�??
  public dragbody_list:dragbody[]=[];          //�??
  //存储连线的列�?? �??增加不删除就�??�??
  public linklist:draglink[] = [];                 //�??
  //dragbody 的map 用uuid来标�??
  public bodymap: Map<string, dragbody>;        //�??
  public bodybaseinfo :Map<string,Baseinfo>;//�??
  public opcodeinfo: Map<string,opcode>;//�??
//#endregion
  jobrunc:Observable<{jobid:string}>;




//#region 以下数据结构�??�?�??�算图结构时更新并使�??
      //记录所有的头节�??
      public sourcelist: dragbody[] = [];
      //图结�??
      public bodyGraph: Map<string, string[]>;
      //存储计算好的数据�??
      public joblist: dragbody[][] = [[]];
      //生成工作流�?�象
      public jobdataflow:JobDataFlow[]=[];
//#endregion





  //在构造函�?? 进�?�相应组件的注入
  constructor(
    private readonly jarService: JarService,
    private readonly notification: NzNotificationService,
    private readonly changeDetector: ChangeDetectorRef,// changeDetector 用于强制更新的注�??
    private readonly sp: SpringbootService,
    private readonly st: StorageService
  ) { }
  //#region init
  ngOnInit() {
    this.opcodeinfo = new Map();
    this.bodybaseinfo = new Map();
    this.bodymap = new Map();
    this.bodyGraph = new Map();
    this.getdatasourcelist();
    jsPlumb.setContainer('diagramContainer')
    $('.btn-controler').draggable({
      helper: 'clone',
      scope: 'ss'
    })
    //设定�??仍的区域
    $(this.areaId).droppable({
      scope: 'ss',
      drop: (event: any, ui: any) => {
        event;
        this.dropNode(ui.draggable[0].dataset, ui.position)
      }
    })

    //ngAfterViewInit()
    jsPlumb.bind('dblclick', (conn: any, originalEvent: any) => {
      this.deleteLine(conn);
      originalEvent;
    })

    // 当链接建�??
    jsPlumb.bind('beforeDrop', (info: any) => {
      return this.connectionBeforeDropCheck(info)
    })

    jsPlumb.importDefaults({
      ConnectionsDetachable: true
    })
    // 获取所有配�??信息



    this.st;
  }
  //#endregion

  deleteLine(conn: any) {
    if (confirm('�??定删除所点击的链接吗�??')) {
      jsPlumb.detach(conn)
    }
  }
  //#endregion

  /**
   * 包�?�好的连接函�?? �??需要id�??
   * @param from ba
   * @param to 
   */
  connectEndpoint(from: any, to: any) {
    jsPlumb.connect({  source: from,
    target: to })
  }

  /**
   *  放入拖动节点
   * @param template 
   * @param position 
   */
  dropNode(dataset: any, position: any) {
    position.left -= $('#side-buttons').outerWidth();
    position.id = uuid.v1();
    console.log(dataset.template);
    var sdf: dragbody = new dragbody();
    sdf.id =  position.id;
    sdf.name =  "testname"
    sdf.top =  position.top;
    sdf.left =  position.left;
    sdf.opcode = dataset.opcode;
    sdf.sourcetype=dataset.template;
        // 将新生成的dragbody放入map
    this.bodymap.set(position.id, sdf);
    if(dataset.template=='operation'){
      this.dragbody_operation.push(sdf);
    }else{
      this.dragbody_list.push(sdf);
    }
    this.changeDetector.detectChanges();//标�?�更�??
  }


  check() {

  //   console.log(this.panes.get(0)?.data.top);
  //  // this.st.set("test",this)

//# �??换工作流
  // this.GraphToJson();
  // this.listconvertojson();
  //   console.log(this.joblist)
  //   this.jsonstr = JSON.stringify(this.jobdataflow);

//获取位置信息
// var test:any= document.getElementById(this.dragbody_list[0].id)?.style.top;
// console.log(test);
// var test:any= document.getElementById(this.dragbody_list[0].id)?.style.left;
// console.log(test);



//存储图标

// this.Saveflow();
// this.InitFlow();
  }
  // 链接建立后的检�??
  // 当出现自连接的情况后，�?�将链接�??开
  connectionBeforeDropCheck(info: any) {

    this.linklist.push({
      source:info.sourceId,
      target:info.targetId
    });//将连线信�??加入到linklist数组�??
    //console.log(info);
    if (!info.connection.source.dataset.pid) {
      return true
    }
    return info.connection.source.dataset.pid !== info.connection.target.dataset.id
  }

//消息通知函数
notify(data: any) {
    this.notification.blank(
      'Job Submit Successful!!!',
      'clink the left buttom to know' + data.toString()
    );
  }

//提交生成的json 任务
  submitJson() {

    this.GraphToJson();
    console.log(this.jsonstr);
    switch(this.jobdataflow[0].source.types){
      case "rtmp":   var rtmpstr:string =this.jobdataflow[0].source.url;
        this.jobrunc = this.jarService.runJob(
        this.JarID,
        "com.star.Job.RtmpPics",
        "1",
        "--sorceIp "+ rtmpstr,
        "",
        ""
      );break;


      case "rtsp": var rtspstr:string =this.jobdataflow[0].source.url;
      this.jobrunc = this.jarService
      .runJob(
        this.JarID,
        "com.star.Job.RtspPics",
        "1",
        "--sorceIp "+ rtspstr,
        "",
        ""
      );break;


      case "modbus":this.jobrunc = this.jarService.runJob(
        this.JarID,
        "com.star.Job.FakeModeBus",
        "1",
        "--config "+ JSON.stringify(this.jobdataflow[0].source),
        "",
        ""
      );break;

      case "opcua": this.jobrunc = this.jarService.runJob(
        this.JarID,
        "com.star.Job.DOpcUa",
        "1",
        "--config "+  "--url opc.tcp://172.31.0.22:49320 --username Administrator --password vvv55555@USTB2022 --is false --identify 123",//  JSON.stringify(this.jobdataflow[0].source),
        "",
        ""
      );break;
      default: this.jobrunc = this.jarService
      .runJob(
        this.JarID,
        "com.star.JobController",
        "1",
        "--jobJson " + this.jsonstr + " --saveUrl hdfs://hadoop102:8020/rng/ck",
        "",
        ""
      );

    }
  
    this.jobrunc.subscribe(data => {
      // this.router.navigate(['job', data.jobid]).then();
      this.notify(data.jobid);
      this.Saveflow(data.jobid);
      this.AddUserJobs(data.jobid);
    });
   
  }

  /**
   * @param id 将�?�关�??的可拖动组件的id�??
   */
  shutDownComp(id: string) {

    this.bodymap.delete(id);//将组件从map�??删除


    this.dragbody_list = this.dragbody_list.filter(
      (item: dragbody) => {
        return item.id !== id;
      }
    );
console.log(this.dragbody_list);

    this.dragbody_operation = this.dragbody_operation.filter(
      (item: dragbody) => {
        return item.id !== id;
      }
    )
console.log(this.dragbody_operation);
    this.panes.filter((item)=> {
      return item.data.id!==id;
    })

    this.panes2.filter((item)=>{
      return item.data.id!==id;
    })

    
    this.changeDetector.detectChanges();
  }

      /**
     * 
     * @param uuid id
     * @returns 返回组件�??
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


  /**
   * 通过后�??获取所有信�??源数�??
   */
  getdatasourcelist() {
    this.Jdbclist$ = this.sp.SearchAllJdbc();
    this.Jdbclist$.subscribe(x =>
      this.Jdbclist = x
    );
    this.Hdfslist$ = this.sp.showAllHdfs();
    this.Hdfslist$.subscribe(x =>
      this.Hdfslist = x
    );
    this.Redislist$ = this.sp.showAllRedis();
    this.Redislist$.subscribe(x =>
      this.Redislist = x
    );

    this.Socketlist$ = this.sp.showAllSocket();
    this.Socketlist$.subscribe(x =>
      this.Socketlist = x
    );
    this.Kafkalist$ = this.sp.ShowallKafka();
    this.Kafkalist$.subscribe(x =>
      this.Kafkalist = x
    );

    this.jobflow$ = this.sp.showAllJobs();
    this.jobflow$.subscribe(x =>
      this.jobflows = x
    );

    this.RtmpList$ = this.sp.showRtmp();
    this.RtmpList$.subscribe(
      x=>this.RtmpList=x
    );
    this.RtspList$ = this.sp.showRtsp();
    this.RtspList$.subscribe(
      x=>this.RtspList=x
    );

    this.ModbusList$ = this.sp.showAllModbus();
    this.ModbusList$.subscribe(x => this.ModbusList = x);
      
    this.Opcualist$ = this.sp.showAllOPCUA();
    this.Opcualist$.subscribe(x=>this.Opcualist = x);
  }




  //#region 图像�??化的相关过程

  /**
   * 将图像转化为json
   */
  GraphToJson() {

    //首先清除计算缓存
    this.sourcelist=[];//没�?�算一次都需要先清零
    this.bodyGraph.clear();
    this.joblist=[[]];
    //维护sourcelist 找出所有的source
    for (let value of this.bodymap.values()) {
      if (this.validSource_body(value.id)) {
        this.sourcelist.push(value);
      }
    }
    //其�?�维�??bodyGraph:map (string,string[]) 生成图结�??
    for (var link of this.linklist) {
      //�??保连线的两�?�都有效
      if (this.valid_body(link.source) && this.valid_body(link.target)) {
        let temps = this.bodyGraph.get(link.source);
        if (temps == undefined) {
          temps=[];
        }
        temps.push(link.target);
        this.bodyGraph.set(link.source, temps);//更新Garph
      }
    }

    //遍历所有的source 来生成joblist
    for (let sourcedata of this.sourcelist) {
      var templist: dragbody[] = [];
      this.Garphdfs(sourcedata.id, templist);
    }
    console.log(this.joblist);
    this.listconvertojson();//最后将生成的数组转化为json字�?�串

  }
  /**
   * 判断组件�??不是target
   * @parma uuid 组件id�??
   */
  validTarget_body(uuid: string): boolean {
    let tempbody = this.bodymap.get(uuid);
    return tempbody !== undefined && tempbody.opcode == 'target';
  }
  /**
   * 判断组件�??不是sourcebody
   * @parma uuid 组件id�??
   */
  validSource_body(uuid: string): boolean {
    let tempbody = this.bodymap.get(uuid);
    return tempbody !== undefined && tempbody?.opcode == 'source';
  }
  /**
   * 
   * @param uuid dragbody 的id�??
   * @returns 判断�??否是有效�?? dragbody
   */
  valid_body(uuid: string): boolean {
    return this.bodymap.has(uuid);
  }


  /**
 * 对用户绘就的单向图进行dfs,提取出有效的工作数据�??
 * @param uuid 当前父亲组件uudi
 * @param joblist_temp  dfs经过节点的dragbody列表
 */
  public Garphdfs= 
  (uuid: string, joblist_temp: dragbody[])=>{
    var templist: string[] | undefined;
    var tempbodylist:dragbody[] = this.clonearray(joblist_temp);
    //先查看是否是有效节点
    if (!this.valid_body(uuid)) return;
    //然后获取�??body 并将节点放入list
    var tempbody = this.bodymap.get(uuid);
    if (tempbody !== undefined) {
      tempbodylist.push( tempbody.cloneD());
    }
    //检察是不是target节点 如果�??则将产生的list添加进joblist
    if (this.validTarget_body(uuid)) {
      
      this.joblist.push(this.clonearray(tempbodylist));
      return;
    }
    //如果当前节点没有子节点信�??就不需要继�??执�?�了
    if (!(this.bodyGraph.has(uuid))) {
      return;
    } else {//否则查找子节�??
      templist = this.bodyGraph.get(uuid);
    }
    if (templist !== undefined)
    for (var node of templist) {
        this.Garphdfs(node, tempbodylist);
    }
  }

/**
 * 对指定dragbody数组进�?�深度�?�制 
 * @param inputlist 将�?��?�制的�?�象dragbody数组
 */
  clonearray(inputlist:dragbody[]):dragbody[]{
    let dragbodylist:dragbody[]=[];
    inputlist.forEach((item)=>{
      dragbodylist.push(item.cloneD());
    })
    return dragbodylist;
  }
  //#endregion



  //#region 生成json过程
  /**
   * main
   */
  listconvertojson(){
    this.jobdataflow=[];
    for(let i =1;i<this.joblist.length;i++){
      var jobflowitem = new JobDataFlow();
      var jobitem = this.joblist[i];
      for(let j =0 ;j<jobitem.length;j++){
       
        if(j==0){
          var tempbasninfo:Baseinfo =this.GetSourceByuuid(jobitem[j].id);
          jobflowitem.source = tempbasninfo;
        }else if(j==jobitem.length-1){
          var tempbasninfo:Baseinfo =this.GetSourceByuuid(jobitem[j].id);
          jobflowitem.dest = tempbasninfo;
        }else {
          var tempoperation:opcode = this.GetOperationByid(jobitem[j].id);
          jobflowitem.operators.push(tempoperation);
        }
      }
      this.jobdataflow.push(jobflowitem);
    }

    this.jsonstr = JSON.stringify(this.jobdataflow);//create json
  }

  /**
   * 通过id获取数据源信�??
   * @param uuid 相应组件的id�??
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
  //#endregion





//#region 保存流程图的业务


    /**
   * 将图像保存到存储
   */
  Saveflow(jobid:string){
    for(let sourceitem of this.panes){
      sourceitem.refreshPosition();
      this.bodybaseinfo.set(sourceitem.data.id,sourceitem.localdatat);
    }
    for(let item of this.panes2){
      item.refreshPosition();
      this.opcodeinfo.set(item.data.id,item.localdata);
    }

    let ft:OneFlowchar=new OneFlowchar();
    ft.bodybaseinfo =  this.st.mapChangeObj(this.bodybaseinfo);
    ft.bodymap =this.st.mapChangeObj(this.bodymap) ;
    ft.dragbody_list = this.dragbody_list;
    ft.dragbody_operation = this.dragbody_operation;
    ft.linklist = this.linklist;
    ft.opcodeinfo =this.st.mapChangeObj(this.opcodeinfo);


    console.log(ft);
    var stestjson =JSON.stringify(ft);
    console.log(JSON.stringify(ft));
    this.st.write(jobid,JSON.stringify(ft));

//存储到后�??数据�??
    this.sp.InsertJobs({
      jobid:jobid,
      jsondata:stestjson,
      jobjson:this.jsonstr
    }).subscribe(()=>
      this.notify("当前图像已经存储")
    );




  }

  AddUserJobs(jobid:string){
    this.sp.AddUserid(jobid).subscribe(() => console.log("已经存储ok"));
  }




  /**
   * 从存储中 取出图像
   */
  InitFlow(jobid:string){
    let ft2 :OneFlowchar=new OneFlowchar();
    ft2 =JSON.parse( this.st.get(jobid) );
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
  }
//#endregion
 
  sdf(){
    console.log(this.linklist)
    for(let link of this.linklist){
      this.connectEndpoint(link.source,link.target);
    }
  }




}


