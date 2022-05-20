import { Component, OnInit, ChangeDetectionStrategy,
QueryList,ChangeDetectorRef, ViewChildren } from '@angular/core';
import * as uuid from 'uuid'; //随机数的生成
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { dragbody, Hdfs, Kafka, redis,Socket } from 'interfaces';
import { JarService, SpringbootService } from 'services';
import {DragbodyComponent} from './dragbody/dragbody.component';
import { JdbcConfig } from 'interfaces';
import { Observable } from 'rxjs';

declare let jsPlumb: any;
declare let $: any;

@Component({
  selector: 'flink-jsplumb2',
  templateUrl: './jsplumb.component.html',
  styleUrls: ['./jsplumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsplumbComponent2 implements OnInit {
  @ViewChildren(DragbodyComponent) panes!: QueryList<DragbodyComponent>;
  area = 'drop-bg';
  areaId = '#' + this.area;


  alldragbody:dragbody[]=[];
  public jsonstr:string="";
  public Jdbclist$  : Observable<JdbcConfig[]>;
  public Jdbclist   : JdbcConfig[];
  public Hdfslist$  : Observable<Hdfs[]>;
  public Hdfslist   : Hdfs[];
  public Kafkalist$ : Observable<Kafka[]>;
  public Kafkalist  : Kafka[];
  public Redislist$ : Observable<redis[]>;
  public Redislist  : redis[];
  public Socketlist$: Observable<Socket[]>;
  public Socketlist : Socket[];

  public dragbody_Jdbc:dragbody[]=[];
  public dragbody_Hdfs:dragbody[]=[];
  public dragbody_Kafka:dragbody[]=[];
  public dragbody_Redis:dragbody[]=[];
  public dragbody_Socket:dragbody[]=[];
  public dragbody_operation:dragbody[]=[];





//在构造函数 进行相应组件的注入
  constructor(
    private readonly jarService: JarService,
    private readonly notification: NzNotificationService,
    private readonly changeDetector: ChangeDetectorRef,// changeDetector 用于强制更新的注入
    private readonly sp :SpringbootService
    ) {}
  //#region init
  ngOnInit() { 
    this.getdatasourcelist();
    jsPlumb.setContainer('diagramContainer')
    $('.btn-controler').draggable({
      helper: 'clone',
      scope: 'ss'
    })
    //设定可仍的区域
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
      originalEvent;//TODO:
    })

    // 当链接建立
    jsPlumb.bind('beforeDrop', (info: any) => {
      return this.connectionBeforeDropCheck(info)
    })

    jsPlumb.importDefaults({
      ConnectionsDetachable: true
    })
// 获取所有配置信息

  }
  //#endregion

  //panes
  ngAfterViewInit(){
    //console.log(this.panes);
  }
  deleteLine(conn: any) {
    if (confirm('确定删除所点击的链接吗？')) {
      jsPlumb.detach(conn)
    }
  }
  //#endregion

  /**
   * 包装好的连接函数 只需要id值
   * @param from ba
   * @param to 
   */
  connectEndpoint(from: any, to: any) {
    jsPlumb.connect({ uuids: [from, to] })
  }

  /**
   *  放入拖动节点TODO:
   * @param template 
   * @param position 
   */
  dropNode(dataset: any, position: any) {
    position.left -= $('#side-buttons').outerWidth();
    position.id = uuid.v1();
    console.log(dataset.template);
    var sdf:dragbody={
      id:position.id,
      name:"testname",
      top:position.top,
      left:position.left,
      opcode:dataset.opcode
    }
    switch(dataset.template){
      case "Redis":this.dragbody_Redis.push(sdf);break;
      case "Hdfs" :this.dragbody_Hdfs.push(sdf);break;
      case "Jdbc" :this.dragbody_Jdbc.push(sdf);break;
      case "Socket" :this.dragbody_Socket.push(sdf);break;
      case "Kafka" :this.dragbody_Kafka.push(sdf);break;
      case "operation":this.dragbody_operation.push(sdf);break;
    }
    this.changeDetector.detectChanges();

  }
  check(){
     //console.log(this.panes.get(0)?.data.sourcedata);
  }

  // 链接建立后的检查
  // 当出现自连接的情况后，要将链接断开
  connectionBeforeDropCheck(info: any) {
    if (!info.connection.source.dataset.pid) {
      return true
    }
    return info.connection.source.dataset.pid !== info.connection.target.dataset.id
  }

  notify(data:any){
    this.notification.blank(
      'Job Submit Successful!!!',
      'clink the left buttom to know' +data.jobid
    );
  }

  submitJson() {
    this.jarService
      .runJob(
        "9efe8fdc-567d-41d4-a86e-76822dee9045_BaseHub-1.0-SNAPSHOT-jar-with-dependencies.jar",
        "com.star.JobController",
        "1",
        "--jobJson " + this.jsonstr + " --saveUrl hdfs://hadoop102:8020/rng/ck",
        "",
        ""
      )
      .subscribe(data => {
        // this.router.navigate(['job', data.jobid]).then();
        this.notify(data);
      });
  }
  /**
   *  
   * @param id 将要关闭的可拖动组件的id值
   */
  shutDownComp(id:string){
    this.alldragbody = this.alldragbody.filter( 
      (item:dragbody)=>{
        return item.id!=id;
      }
    );
    this.changeDetector.detectChanges();
  }

  getdatasourcelist(){
    this.Jdbclist$ = this.sp.SearchAllJdbc();
    this.Jdbclist$.subscribe( x=>
        this.Jdbclist = x
    );
    this.Hdfslist$ = this.sp.showAllHdfs();
    this.Hdfslist$.subscribe( x=>
        this.Hdfslist = x
    );
    this.Redislist$ = this.sp.showAllRedis();
    this.Redislist$.subscribe( x=>
        this.Redislist = x
    );

    this.Socketlist$ = this.sp.showAllSocket();
    this.Socketlist$.subscribe( x=>
        this.Socketlist = x
    );
    this.Kafkalist$ = this.sp.ShowallKafka();
    this.Kafkalist$.subscribe( x=>
        this.Kafkalist = x
    );

  }
}
