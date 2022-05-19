import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import * as uuid from 'uuid'; //随机数的生成
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { dragbody } from 'interfaces';
import { JarService } from 'services';

declare let jsPlumb: any;
declare let $: any;
declare let Mustache: any;

@Component({
  selector: 'flink-jsplumb2',
  templateUrl: './jsplumb.component.html',
  styleUrls: ['./jsplumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsplumbComponent2 implements OnInit {
  area = 'drop-bg';
  areaId = '#' + this.area;
  alldragbody:dragbody[]=[];
  root: any = {}
  public jsonstr:string="";
  //信息存储类
  //#region 存储绘画的格式信息
  visoConfig = {
    visoTemplate: { playAudioNode: '<div class="pa" id="{{id}}" style="top:{{top}}px;left:{{left}}px"><a class="btn btn-success" href="#" role="button">放音</a></div>' }
    // 基本连接线样式
    , connectorPaintStyle: {
      lineWidth: 2,
      strokeStyle: '#61B7CF',
      joinstyle: 'round',
      fill: 'pink',
      outlineColor: '',
      outlineWidth: ''
    },// 鼠标悬浮在连接线上的样式
    connectorHoverStyle: {
      lineWidth: 2,
      strokeStyle: 'red',
      outlineWidth: 10,
      outlineColor: ''
    },
    baseStyle: {
      endpoint: ['Dot', {
        radius: 8,
        fill: 'pink'
      }], // 端点的形状
      connectorStyle: {
        lineWidth: 2,
        strokeStyle: '#61B7CF',
        joinstyle: 'round',
        fill: 'pink',
        outlineColor: '',
        outlineWidth: ''
      }, // 连接线的颜色，大小样式
      connectorHoverStyle: {
        lineWidth: 2,
        strokeStyle: 'red',
        outlineWidth: 10,
        outlineColor: ''
      },
      paintStyle: {
        strokeStyle: '#1e8151',
        stroke: '#7AB02C',
        fill: 'pink',
        fillStyle: '#1e8151',
        radius: 6,
        lineWidth: 2
      }, // 端点的颜色样式
      // hoverPaintStyle: {
      //   outlineStroke: 'pink'
      // },
      hoverPaintStyle: { stroke: 'blue' },
      isSource: true, // 是否可以拖动（作为连线起点）
      connector: ['Flowchart', { gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],  // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
      isTarget: true, // 是否可以放置（连线终点）
      maxConnections: -1, // 设置连接点最多可以连接几条线
      connectorOverlays: [
        ['Arrow', {
          width: 10,
          length: 10,
          location: 1
        }],
        ['Arrow', {
          width: 10,
          length: 10,
          location: 0.2
        }],
        ['Arrow', {
          width: 10,
          length: 10,
          location: 0.7
        }],
        ['Label', {
          label: '',
          cssClass: '',
          labelStyle: {
            color: 'red'
          },
          events: {
          }
        }]
      ],
      baseArchors: ['RightMiddle', 'LeftMiddle']
    }
  }
  //#endregion
  public showdat: number = 3;
  constructor(private readonly jarService: JarService,
    private readonly notification: NzNotificationService,
    private changeDetector: ChangeDetectorRef) { }
// changeDetector 用于强制更新的注入

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
        console.log(ui);
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
   *  放入拖动节点TODO
   * @param template 
   * @param position 
   */
  dropNode(template: any, position: any) {
    position.left -= $('#side-buttons').outerWidth()
    position.id = uuid.v1()
    position.generateId = uuid.v1
    template;
    // var html = this.renderHtml(template, position)
    // $(this.areaId).append(html)
    // this.initSetNode(template, position.id)
    var sdf:dragbody={
      id:position.id,
      name:"testname",
      top:position.top,
      left:position.left
    }
    this.alldragbody.push(sdf);
    this.changeDetector.detectChanges();
    // this.addDraggable(position.id);
    // this.setEnterPoint(position.id)
    // this.setExitPoint(position.id, 'Bottom');//todo
    // this.setExitPoint(position.id, 'Right');
    // this.setExitPoint(position.id, 'Left');
  }
  check(){
    console.log(this.alldragbody.length);
  }
  // 初始化各种节点设置
  initSetNode(template: any, id: any) {
    this.addDraggable(id)
    if (template === 'tpl-audio') {
      this.setEnterPoint(id)
      this.setExitPoint(id, null);//todo
    } else if (template === 'tpl-menu') {
      this.setEnterPoint(id + '-heading')
    } else {
      this.setEnterPoint(id)
      this.setExitPoint(id, 'Bottom');//todo
      this.setExitPoint(id, 'Right');
      this.setExitPoint(id, 'Left');
    }
  }

  // 设置入口点 统一为顶部的
  setEnterPoint(id: any) {
    var config = this.getBaseNodeConfig()
    config.isSource = false
    config.maxConnections = -1
    jsPlumb.addEndpoint(id, {
      anchors: 'Top',
      uuid: id + '-in'
    }, config)
  }


  /**
   *   // 设置出口点
   * @param id 任意组件的id值
   * @param position  出口点在那个位置 Bottom \Top \Left\Right
   */
  setExitPoint(id: any, position: any) {
    var config = this.getBaseNodeConfig()
    config.isTarget = false
    config.maxConnections = 1
    jsPlumb.addEndpoint(id, {
      anchors: position || 'Bottom',
      uuid: id + '-out'
    }, config)
  }



  // 删除一个节点以及
  emptyNode(id: any) {
    jsPlumb.remove(id)
  }

  // 让元素可拖动
  addDraggable(id: any) {
    jsPlumb.draggable(id, {
      containment: 'parent'
    });
  }

  // 渲染html
  renderHtml(type: any, position: any) {
    return Mustache.render(this.getTemplate(type), position)
  }
  eventHandler(data: any) {
    if (data.type === 'deleteNode') {
      this.emptyNode(data.id)
    }
  }
  // 链接建立后的检查
  // 当出现自连接的情况后，要将链接断开
  connectionBeforeDropCheck(info: any) {
    if (!info.connection.source.dataset.pid) {
      return true
    }
    return info.connection.source.dataset.pid !== info.connection.target.dataset.id
  }

  // 获取基本配置
  getBaseNodeConfig() {
    return Object.assign({}, this.visoConfig.baseStyle)
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

  shutDownComp(id:string){

    this.alldragbody = this.alldragbody.filter( 
      (item:dragbody)=>{
        return item.id!=id;
      }
    );
    this.changeDetector.detectChanges();
  }

}
//const anchors = [[1, 0.2, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0], [0.2, 0, 0, -1]];
