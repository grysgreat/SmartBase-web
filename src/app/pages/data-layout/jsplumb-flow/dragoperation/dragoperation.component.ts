import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
declare let jsPlumb: any;
import { Input,Output,EventEmitter } from '@angular/core';
import {  dragbody,opcode } from 'interfaces';

@Component({
  selector: 'flink-dragoperation',
  templateUrl: './dragoperation.component.html',
  styleUrls: ['./dragoperation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragoperationComponent implements OnInit {
  @Input() data:dragbody;
  @Output() dataChange=new EventEmitter<dragbody> ();
  @Output() close=new EventEmitter<string>();
  localdata:opcode={
    type:"",
    key:""
  }
  constructor() { }
  public tips:string="";

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
    switch(this.data.opcode){
      case "计算子":this.localdata.type = 'OpCount';this.tips ="记录个数，key=null";
                    break;
      case "滤算子" :this.localdata.type = 'OpFilt';this.tips ="过滤关键字,只保留含有key的流";
                    break;
      case "映算子" :this.localdata.type = 'OpMap';this.tips ="设置映射关系，目标数据库的字段对应源数据库的第i个字段，以逗号分割";
                    break;
      case "灭算子" :this.localdata.type = 'OpKill';this.tips ="删除关键字，去除含有key的流";break;
      case "時算子" :this.localdata.type = 'OpTime';this.tips ="定时任务，任务持续时间";break;
      case "造算子" :this.localdata.type = 'OpNew';this.tips ="自定义算子，填入实现接口以后的jar包路径，和算子全类名，以 “&” 符号分割";break;
      default: this.localdata.type = 'unknow';
    }
  }


  ngAfterViewInit(): void {
    var uid = this.data.id;
    jsPlumb.draggable(this.data.id);
    // 配置出入点的过程
     this.setInPoint(uid);
     this.setExitPoint(uid,'Bottom');
  }

  value_notnull(obj:any):boolean{
    return obj!==null &&  obj!==undefined;
  }

  getBaseNodeConfig() {
    return Object.assign({}, this.visoConfig.baseStyle)
  }


  /**
   *   // 设置出口点
   * @param id 任意组件的id值
   * @param position  出口点在那个位置 Bottom \Top \Left\Right
   */
   setExitPoint(id: any, position: any) {
    var config = this.getBaseNodeConfig()
    config.isTarget = false
    config.maxConnections = -1
    jsPlumb.addEndpoint(id, {
      anchors: position || 'Bottom',
      uuid: id + '-out'
    }, config)
  }

  setInPoint(uid:any){
    var config = this.getBaseNodeConfig();
    config.isSource = false
    config.maxConnections = -1
    jsPlumb.addEndpoint(uid, {
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

  refreshPosition(){
    var t:any  = document.getElementById(this.data.id);
    this.data.left =Number( t.style.left.slice(0,-2));
    this.data.top = Number(t.style.top.slice(0,-2));
    this.dataChange.emit(this.data);
  }
}
