import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { dragbody } from 'interfaces';

declare let jsPlumb: any;
@Component({
  selector: 'flink-dragbody',
  template: `
  <div class='pa' id={{data.id}} style='top:{{data.top}}px;left:{{data.left}}px'>
  <div class='panel panel-default panel-node panel-info'>
  <div [id]="data.id+'head'" class='panel-heading'>
  <i class='fa fa-calendar-times-o' aria-hidden='true'></i> 
  {{data.name}}
  <span class='delete-node pull-right' data-type='deleteNode' data-id='{{data.id}}'
  (click)="shutdown()">
    X</span>
  </div>
  <ul class='list-group'>
    <li id='{{data.id}}-onWorkTime'  class='list-group-item panel-node-list'>
      源数据源
    </li>
    <li id='{{data.id}}-offWorkTime'  class='list-group-item panel-node-list'>
    数据类型：mysql
    </li></ul>
  </div>
  </div>
  `,
  styleUrls: ['./dragbody.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragbodyComponent implements OnInit {
  @Input() data:dragbody;
  @Output() close=new EventEmitter<string>();
  constructor() { }
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
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var uid = this.data.id;
    jsPlumb.draggable(this.data.id);

    var config = this.getBaseNodeConfig()
    config.isSource = false
    config.maxConnections = -1
    jsPlumb.addEndpoint(uid, {
      anchors: 'Top',
      uuid: this.data.id + '-in'
    }, config)
    this.setExitPoint(uid, 'Bottom');//todo
    this.setExitPoint(uid, 'Right');
    this.setExitPoint(uid, 'Left');
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
    config.maxConnections = 1
    jsPlumb.addEndpoint(id, {
      anchors: position || 'Bottom',
      uuid: id + '-out'
    }, config)
  }

  shutdown(){
    //TODO
    jsPlumb.remove(this.data.id);
    this.close.emit(this.data.id);
  }
}
