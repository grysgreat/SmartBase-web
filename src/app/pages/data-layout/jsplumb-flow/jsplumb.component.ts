import { Component, OnInit, ChangeDetectionStrategy,
  QueryList,ChangeDetectorRef, ViewChildren } from '@angular/core';
import * as uuid from 'uuid'; //随机数的生成
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { dragbody } from 'interfaces';
import { JarService } from 'services';
import {DragbodyComponent} from './dragbody/dragbody.component'
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
  public showdat: number = 3;
  constructor(private readonly jarService: JarService,
    private readonly notification: NzNotificationService,
    private changeDetector: ChangeDetectorRef// changeDetector 用于强制更新的注入
    ) { }


  //#region init
  ngOnInit() {
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
        this.dropNode(ui.draggable[0].dataset.template, ui.position)
      }
    })
  

    
    // // 单点击了连接线上的X号 对组件进行删除
    // $('#app').on('click',  (event:any)=> {
    //   event.stopPropagation()
    //   event.preventDefault()
    //   this.eventHandler(event.target.dataset)
    // })
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

  //获取mustache 模板
  getTemplate(node: any) {
    switch (node) {
      case ('yuan-source'):
        return `
        <div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'>
        <div class='panel panel-default panel-node panel-info'>
        <div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'>
        <i class='fa fa-calendar-times-o' aria-hidden='true'></i> 
        {{name}}
        <span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></div><ul class='list-group'><li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>源数据源</li><li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>数据类型：mysql</li></ul>
        </div>
        </div>`;
      case ('op-source1'):
        return `<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><div class='panel panel-default panel-node panel-info'><div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o' aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></div><ul class='list-group'><li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>中间算子</li><li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>算子类型：计数</li></ul></div></div>        `;
      case ('op-source2'): return `<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'>
<div class='panel panel-default panel-node panel-info'>
  <div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o'
      aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode'
      data-id='{{id}}'>X</span></div>
  <ul class='list-group'>
    <li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>中间算子</li>
    <li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>算子类型：数据流分流</li>
  </ul>
</div>
</div>`

case('op-source3'):return `<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'>
<div class='panel panel-default panel-node panel-info'>
  <div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o'
      aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode'
      data-id='{{id}}'>X</span></div>
  <ul class='list-group'>
    <li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>中间算子</li>
    <li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>算子类型：数据流合流</li>
  </ul>
</div>
</div>`;
case('op-source4') : return `<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'>
<div class='panel panel-default panel-node panel-info'>
  <div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o'
      aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode'
      data-id='{{id}}'>X</span></div>
  <ul class='list-group'>
    <li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>中间算子</li>
    <li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>算子类型：数据清洗、筛选</li>
  </ul>
</div>
</div>
`

      case ('op-source5'): return `
<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'>
  <div class='panel panel-default panel-node panel-info'>
    <div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o'
        aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode'
        data-id='{{id}}'>X</span></div>
    <ul class='list-group'>
      <li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>中间算子</li>
      <li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>算子类型：定时</li>
    </ul>
  </div>
</div>
        `
      case ('target-source'):
        return `<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><div class='panel panel-default panel-node panel-info'><div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o' aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></div><ul class='list-group'><li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>目的数据源</li><li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>数据类型：mysql</li></ul></div></div>`;
      default: return "";
    }

    return $('#tpl-' + node.type).html() || $('#tpl-demo').html()
  }

  /**
   *  放入拖动节点TODO:
   * @param template 
   * @param position 
   */
  dropNode(template: any, position: any) {
    position.left -= $('#side-buttons').outerWidth()
    position.id = uuid.v1()
    position.generateId = uuid.v1
    template;
    var sdf:dragbody={
      id:position.id,
      name:"testname",
      top:position.top,
      left:position.left
    }
    this.alldragbody.push(sdf);
    this.changeDetector.detectChanges();

  }
  check(){
    console.log(this.panes.get(0)?.strtest);
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
}
