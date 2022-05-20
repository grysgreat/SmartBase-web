import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { Baseinfo, dragbody } from 'interfaces';
//import { Draginfo} from 'interfaces';
declare let jsPlumb: any;
@Component({
  selector: 'flink-dragbody',
  templateUrl: './dragbody.component.html',
  styleUrls: ['./dragbody.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DragbodyComponent implements OnInit {
  @Input() data:dragbody;
  @Input() configlist:Baseinfo[];
  @Output() close=new EventEmitter<string>();
  types:string|undefined="";
  localdatat:Baseinfo;
  dragbody:dragbody;
  constructor() { }
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
    if(this.configlist){
      this.localdatat=this.configlist[0];
    }
  

    if(this.value_notnull(this.data.sourcedata?.types)){
      this.types = this.localdatat.types
    }
   

    //       // ✅ 遍历demo
    // let key: keyof Baseinfo;
    
    // for (key in  this.localdatat) {

    //   console.log(key, this.localdatat[key]);
    // }

  }
  ngAfterViewInit(): void {
    var uid = this.data.id;
    jsPlumb.draggable(this.data.id);
    // 配置出入点的过程
    switch(this.data.opcode){
      case 'source':this.setExitPoint(uid, 'Bottom');break;
      case 'target':this.setInPoint(uid);break;
    }
    // this.setExitPoint(uid, 'Right');
    // this.setExitPoint(uid, 'Left');
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
}
