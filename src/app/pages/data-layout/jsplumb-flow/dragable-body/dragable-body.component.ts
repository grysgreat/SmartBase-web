import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { Baseinfo, dragbody } from 'interfaces';
//import { Draginfo} from 'interfaces';
declare let jsPlumb: any;
@Component({
  selector: 'flink-dragable-body',
  templateUrl: './dragable-body.component.html',
  styleUrls: ['./dragable-body.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragableBodyComponent implements OnInit {

  @Input() data !:dragbody;
  @Output() dataChange =new EventEmitter<dragbody>();
  @Input() singleconfig:Baseinfo;
  configlist:Baseinfo[];

  //直接传入所有配置源
  @Input() redislist:Baseinfo[];
  @Input() kafkalist:Baseinfo[];
  @Input() jdbclist :Baseinfo[];
  @Input() socketlist:Baseinfo[];
  @Input() hdfslist:Baseinfo[];
  @Output() close=new EventEmitter<string>();
  types:string|undefined="";
  localdatat:Baseinfo;

  public endpoint:any=null;
  public inpoint:any=null;

  constructor(){}
  
  visoConfig = {
    // 基本连接线样式
    connectorPaintStyle: {
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
      ConnectionsDetachable:false,
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
  ngOnInit(): void {

    switch(this.data.sourcetype){
      case "Redis":this.configlist=this.redislist; break;
      case "Hdfs": this.configlist=this.hdfslist; break;
      case "Jdbc": this.configlist=this.jdbclist; break;
      case "Socket": this.configlist=this.socketlist; break;
      case "Kafka": this.configlist=this.kafkalist; break;
    }
    if(this.singleconfig){
      this.localdatat=this.singleconfig;
    }
    else if(this.configlist){
      this.localdatat = this.configlist[0];
    }
    if(this.value_notnull(this.localdatat.types)){
      this.types = this.localdatat.types
    }
  }

  ngAfterViewInit(): void {
    var uid = this.data.id;
    jsPlumb.draggable(this.data.id);
    // 配置出入点的过程
    switch(this.data.opcode){
      case 'source':this.setExitPoint(uid, 'Bottom');break;
      case 'target':this.setInPoint(uid);break;
    }
  }

  /**
   *  判断变量是否有效
   * @param obj 判断变量
   * @returns 
   */
  value_notnull(obj:any):boolean{
    return obj!==null &&  obj!==undefined;
  }

  getBaseNodeConfig() {
    return Object.assign({}, this.visoConfig.baseStyle)
  }

  /**
   *  设置出口点
   * @param id 组件的id
   * @param position  出口点在那个位置 Bottom \Top \Left\Right
   */
   setExitPoint(id: any, position: any) {
    var config = this.getBaseNodeConfig()
    config.isTarget = false
    config.maxConnections = -1
    this.endpoint= jsPlumb.addEndpoint(id, {
      anchors: position || 'Bottom',
      uuid: id + '-out'
    }, config)

  }

  /**
   * 为当前组件设置入口点
   * @param uid 组件的id
   */
  setInPoint(uid:any){
    var config = this.getBaseNodeConfig();
    config.isSource = false
    config.maxConnections = -1
    this.inpoint = jsPlumb.addEndpoint(uid, {
      anchors: 'Top',
      uuid: uid + '-in'
    }, config)
   
  }

  /**
   * 关闭组件的函数 
   * 包括通知父类和删除关联连线
   */
  shutdown(){
    jsPlumb.remove(this.data.id);
    this.close.emit(this.data.id);
  }
  check(){
    this.dataChange.emit(this.data);
    console.log(this.data.left);
  }

  refreshPosition(){
    var t:any  = document.getElementById(this.data.id);
    this.data.left =Number( t.style.left.slice(0,-2));
    this.data.top = Number(t.style.top.slice(0,-2));
    this.dataChange.emit(this.data);
  }
}
