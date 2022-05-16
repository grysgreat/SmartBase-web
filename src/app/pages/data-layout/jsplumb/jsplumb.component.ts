import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { Graph,alg,Path } from 'graphlib';
//declare let uuid :any;
import * as uuid from 'uuid';
declare let jsPlumb: any;
declare let $: any;
declare let Mustache :any;

@Component({
  selector: 'flink-jsplumb',
  templateUrl: './jsplumb.component.html',
  styleUrls: ['./jsplumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsplumbComponent implements OnInit {
    
    area = 'drop-bg';
    areaId = '#' + this.area;
    root:any = {}
    //信息存储类
    data:any= {
      'id': '4000',
      'name': '功能测试',
      'status': 'enable',
      'varList': [
    
      ],
      'nodeList': [
        {
          'id': 'Start',
          'type': 'Root',
          'comment': '开始',
          'status': '1',
          'data': {
            'nextNode': 'Announce'
          },
          'top': 50,
          'left': 150
        },
        {
          'id': 'Announce',
          'type': 'Announce',
          'comment': '语音节点',
          'status': '1',
          'data': {
            'nextNode': 'WorkTime',
            'prompts': [
              {
                'type': 'VOX',
        
              }
            ]
          },
          'top': 178,
          'left': 131
        },
        {
          'id': 'WorkTime',
          'type': 'WorkTime',
          'comment': '',
          'status': '1',
          'data': {
            'weekDay': '1,2,3,4,5',
            'workTime': '08:00~16:00',
            'onWorkNode': 'Menu',
            'offWorkNode': 'Menu2',
            'mDays': [
              {
                'date': '',
                'type': 'onWork'
              },
              {
                'date': '',
                'type': 'offWork'
              }
            ]
          },
          'top': 305,
          'left': 85
        },
        {
          'id': 'Menu',
          'type': 'Menu',
          'comment': '',
          'status': '1',
          'data': {
            'nextNode': 'Exit',
            'prompts': [
              {
                'type': 'VOX',
                'value': 'api/file/download/nosession/.mp3'
              }
            ],
            'noinput': {
              'timeout': '',
              'threshold': '',
              'nextNode': 'Exit',
              'prompt': {
                'type': 'VOX',
                'value': 'api/file/download/nosession/.mp3'
              }
            },
            'nomatch': {
              'threshold': '',
              'nextNode': 'Exit',
              'prompt': {
                'type': 'VOX',
                'value': 'api/file/download/nosession/.mp3'
              }
            },
            'choices': [
              {
                'key': '1',
                'nextNode': 'Exit'
              },
              {
                'key': '2',
                'nextNode': 'Exit'
              },
              {
                'key': '3',
                'nextNode': 'Exit'
              }
            ]
          },
          'top': 499,
          'left': 281
        },
        {
          'id': 'Menu2',
          'type': 'Menu',
          'comment': '',
          'status': '1',
          'data': {
            'nextNode': 'Exit',
            'prompts': [
              {
                'type': 'VOX',
                'value': 'api/file/download/nosession/.mp3'
              }
            ],
            'noinput': {
              'timeout': '',
              'threshold': '',
              'nextNode': 'Exit',
              'prompt': {
                'type': 'VOX',
                'value': 'api/file/download/nosession/.mp3'
              }
            },
            'nomatch': {
              'threshold': '',
              'nextNode': 'Exit',
              'prompt': {
                'type': 'VOX',
                'value': 'api/file/download/nosession/.mp3'
              }
            },
            'choices': [
              {
                'key': '1',
                'nextNode': 'Exit'
              },
              {
                'key': '2',
                'nextNode': 'Announce'
              }
            ]
          },
          'top': 330,
          'left': 503
        },
        {
          'id': 'Exit',
          'type': 'Exit',
          'status': '1',
          'comment': '结束',
          'data': {
    
          },
          'top': 829,
          'left': 883
        }
      ]
    }
    
//#region 存储绘画信息
visoConfig = {
  visoTemplate: {playAudioNode:'<div class="pa" id="{{id}}" style="top:{{top}}px;left:{{left}}px"><a class="btn btn-success" href="#" role="button">放音</a></div>'}
  // 基本连接线样式
  ,connectorPaintStyle : {
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
  baseStyle : {
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
    connectorHoverStyle:{
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
    baseArchors:['RightMiddle', 'LeftMiddle']
  }
}
//#endregion
    constructor() {
  
    }


//init
    ngOnInit() {
      jsPlumb.setContainer('diagramContainer')
      $('.btn-controler').draggable({
        helper: 'clone',
        scope: 'ss'
      })
      $(this.areaId).droppable({
        scope: 'ss',
        drop: (event:any, ui:any)=> {
            event;
            console.log(ui.position);
          this.dropNode(ui.draggable[0].dataset.template, ui.position)
        }
      })
      $('#app').on('click',  (event:any)=> {
        event.stopPropagation()
        event.preventDefault()
        this.eventHandler(event.target.dataset)
      })

      // 单点击了连接线上的X号
      jsPlumb.bind('dblclick',  (conn:any, originalEvent:any)=> {
        this.deleteLine(conn);
        originalEvent;//TODO:
      })
  
      // 当链接建立
      jsPlumb.bind('beforeDrop', (info:any)=> {
        return this.connectionBeforeDropCheck(info)
      })
  
      // 让退出节点可拖动
      // this.addDraggable(fixedNodeId.end)
      // initBeginNode()
      // initEndNode()
  
      // DataProcess.inputData(data.nodeList)
      this.draw(this.data.nodeList);
      jsPlumb.importDefaults({
        ConnectionsDetachable: true
      })
    }

  
    inputData(nodes:any){
          var ids = this.getNodeIds(nodes)
          var g = new Graph();
          ids.forEach( (id:any)=> {
            g.setNode(id)
          })
          nodes.forEach( (item:any) =>{

            switch(item.type){
              case "Root":this.dealNodeRoot(g,item); break;
              case "Announce":this.dealNodeAnnounce(g,item);break;
              case "Exit": this.dealNodeExitg(g,item);break;
              case "WorkTime":this.dealNodeWorkTime(g,item);break;
              case "Menu":this.dealNodeMenu(g,item);break;
            }
                 
          })
    
          var distance = alg.dijkstra(g, 'Start');
    
          return this.generateDepth(distance)
    }

    setNodesPosition(nodes:any){
          var me = this
          nodes.forEach( (item:any) =>{
            me.getNodePosition(item)
          })
    }

    getNodePosition(node:any){
          var $node = document.getElementById(node.id)
          if($node!==null){
            node.top = parseInt($node.style.top)
            node.left = parseInt($node.style.left)
          }
    }

    generateDepth(deep:{[node: string]:Path }):any{
      var depth:any = [];

      Object.keys(deep).forEach(function (key) {
        var distance = deep[key].distance

        if (!depth[distance]) {
          depth[distance] = []
        }
        depth[distance].push(key)
      })
      return depth
    }


    
    getNodeIds(nodes:any){
          return nodes.map(function (item:any) {
            return item.id
          })
    }
    dealNodeRoot(g:any, node:any) {
          this.setEdge(g, node.id, node.data.nextNode)
    }
    dealNodeAnnounce(g:any, node:any){
          this.setEdge(g, node.id, node.data.nextNode)
    }
    dealNodeExitg(a:any, node:any){
      a;
      node;
    }
    dealNodeWorkTime(g:any, node:any){
          this.setEdge(g, node.id, node.data.onWorkNode)
          this.setEdge(g, node.id, node.data.offWorkNode)
    }
    dealNodeMenu(g:any, node:any) {
          this.setEdge(g, node.id, node.data.nextNode)
    }
    setEdge(g:any, from:any, to:any) {
          g.setEdge(from, to)
    }
    
    
    
    deleteLine(conn:any){
          if (confirm('确定删除所点击的链接吗？')) {
            jsPlumb.detach(conn)
          }
    }
    draw(nodes:any) {
          // 将Exit节点排到最后
          nodes.sort( (a:any, b:any) =>{
            if (a.type === 'Exit') return 1
            if (b.type === 'Exit') return -1
            return 0
          })
    
          this.computeXY(nodes)
    
          // var template = $('#tpl-demo').html()
          var $container = $(this.areaId)
          nodes.forEach( (item:any, key:any) =>{
            key;
            this.data = {
              id: item.id,
              name: item.id,
              top: item.top,
              left: item.left,
              choices: item.data.choices || []
            }
    
            //var template = "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><a class='btn btn-default' href='#' role='button'><i class='fa fa-play-circle-o' aria-hidden='true'></i>{{name}}<span class='delete-node pull-right' data-type=\"deleteNode\" data-id=\"{{id}}\">X</span></a></div>";
            var template = this.getTemplate(item)
            $container.append(Mustache.render(template, this.data));
            
            // if (me['addEndpointOf' + item.type]) {
            //   me['addEndpointOf' + item.type](item)
            // }
            
if(item.type!==undefined){
  switch(item.type){
    case "Root":this.addEndpointOfRoot(item); break;
    case "Announce":this.addEndpointOfAnnounce(item);break;
    case "Exit": this.addEndpointOfExit(item);break;
    case "WorkTime":this.addEndpointOfWorkTime(item);break;
    case "Menu":this.addEndpointOfMenu(item);break;
  }
}
           
          })
    
          this.mainConnect(nodes)
    }
    connectEndpoint(from:any, to:any) {
          jsPlumb.connect({ uuids: [from, to] })
    }
    mainConnect(nodes:any) {
          nodes.forEach( (item:any)=>{
            if(item.type!==undefined){
              switch(item.type){
    case "Root":this.connectEndpointOfRoot(item); break;
    case "Announce":this.connectEndpointOfAnnounce(item);break;
    case "Exit":this.addEndpointOfExit(item);break;
    case "WorkTime":this.connectEndpointOfWorkTime(item);break;
    case "Menu":this.connectEndpointOfMenu(item);break;
              }
            }
          })
    }
    getTemplate(node:any) {
      switch(node.type)
{
  case ('Exit'):
  case ('Root'):
  case ('tpl-demo'):
  case ('tpl-Root'):
  case ('tpl-Exit'):
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><a class='btn btn-danger' href='#' role='button'> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></a></div>";
  case ("Announce"):
  case ('tpl-Announce'): 
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><a class='btn btn-default' href='#' role='button'><i class='fa fa-play-circle-o' aria-hidden='true'></i>{{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></a></div>";
  case ('WorkTime'):
  case ('tpl-WorkTime'):
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><div class='panel panel-default panel-node panel-info'><div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o' aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></div><ul class='list-group'><li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>工作时间</li><li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>非工作时间</li></ul></div></div>";
  case ('Menu'):
  case ('tpl-menu'):
  case ('tpl-Menu'):
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><div class='panel panel-default panel-node panel-info'><div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-navicon' aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></div><ul class='list-group'><li id='{{id}}-noinput' data-pid='{{id}}' class='list-group-item panel-node-list'>输入超时</li><li id='{{id}}-nomatch' data-pid='{{id}}' class='list-group-item panel-node-list'>输入错误</li>{{#choices}}<li id='{{id}}-key-{{key}}' data-pid='{{id}}' class='list-group-item panel-node-list'>按{{key}}</li>{{/choices}}</ul></div></div>";
  case ('tpl-audio'):
  return '<div class="pa" id="{{id}}" style="top:{{top}}px;left:{{left}}px"><a class="btn btn-success" href="#" role="button">放音</a></div>';

}
switch(node)
{
  case ('Exit'):
  case ('Root'):
  case ('tpl-demo'):
  case ('tpl-Root'):
  case ('tpl-Exit'):
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><a class='btn btn-danger' href='#' role='button'> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></a></div>";
  case ("Announce"):
  case ('tpl-Announce'): 
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><a class='btn btn-default' href='#' role='button'><i class='fa fa-play-circle-o' aria-hidden='true'></i>{{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></a></div>";
  case ('WorkTime'):
  case ('tpl-WorkTime'):
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><div class='panel panel-default panel-node panel-info'><div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-calendar-times-o' aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></div><ul class='list-group'><li id='{{id}}-onWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>工作时间</li><li id='{{id}}-offWorkTime' data-pid='{{id}}' class='list-group-item panel-node-list'>非工作时间</li></ul></div></div>";
  case ('Menu'):
  case ('tpl-menu'):
  case ('tpl-Menu'):
  return "<div class='pa' id='{{id}}' style='top:{{top}}px;left:{{left}}px'><div class='panel panel-default panel-node panel-info'><div id='{{id}}-heading' data-id='{{id}}' class='panel-heading'><i class='fa fa-navicon' aria-hidden='true'></i> {{name}}<span class='delete-node pull-right' data-type='deleteNode' data-id='{{id}}'>X</span></div><ul class='list-group'><li id='{{id}}-noinput' data-pid='{{id}}' class='list-group-item panel-node-list'>输入超时</li><li id='{{id}}-nomatch' data-pid='{{id}}' class='list-group-item panel-node-list'>输入错误</li>{{#choices}}<li id='{{id}}-key-{{key}}' data-pid='{{id}}' class='list-group-item panel-node-list'>按{{key}}</li>{{/choices}}</ul></div></div>";
  case ('tpl-audio'):
  return '<div class="pa" id="{{id}}" style="top:{{top}}px;left:{{left}}px"><a class="btn btn-success" href="#" role="button">放音</a></div>';

}

          return $('#tpl-' + node.type).html() || $('#tpl-demo').html()
    }
    computeXY(nodes:any){
          var matrix = this.inputData(nodes)
    
          var base = {
            topBase: 50,
            topStep: 150,
            leftBase: 150,
            leftStep: 200
          }
    
          for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
              var key = matrix[i][j]
    
              var dest = nodes.find( (item:any)=>{
                return item.id === key
              }) 

              dest.top = dest.top || base.topBase + i * base.topStep
              dest.left = dest.left || base.leftBase + j * base.leftStep
              console.log("-----------------BUGS-------------------");
              console.log(matrix);
              console.log(dest.left);
            }
          }
    }
    addEndpointOfRoot (node:any){
          this.addDraggable(node.id)
          this.initBeginNode(node.id)
    }
    connectEndpointOfRoot (node:any) {
          this.connectEndpoint(node.id + '-out', node.data.nextNode + '-in')
    }
    addEndpointOfExit(node:any) {
        this.addDraggable(node.id)
        this.initEndNode(node.id)
    }
    addEndpointOfAnnounce (node:any){
          this.addDraggable(node.id)
          this.setEnterPoint(node.id)
          this.setExitPoint(node.id,null)//TODO
    }
    connectEndpointOfAnnounce  (node:any) {
        this.connectEndpoint(node.id + '-out', node.data.nextNode + '-in')
    }
    addEndpointOfWorkTime (node:any) {
          this.addDraggable(node.id)
          this.setEnterPoint(node.id)
    
          var ids = ['onWorkTime', 'offWorkTime']
    
          ids.forEach( (key:any) =>{
            this.setExitPoint(node.id + '-' + key, 'Right')
          })
    }
    connectEndpointOfWorkTime (node:any) {
        this.connectEndpoint(node.id + '-onWorkTime-out', node.data.onWorkNode + '-in')
          this.connectEndpoint(node.id + '-offWorkTime-out', node.data.offWorkNode + '-in')
    }
    addEndpointOfMenu(node:any){
          this.addDraggable(node.id)
          this.setEnterPoint(node.id)
    
          var ids = ['noinput', 'nomatch']
    
          node.data.choices.forEach( (item:any) =>{
            ids.push('key-' + item.key)
          })
    
          ids.forEach( (key)=> {
            this.setExitPoint(node.id + '-' + key, 'Right')
          })
    }
    connectEndpointOfMenu(node:any){
          this.connectEndpoint(node.id + '-noinput-out', node.data.noinput.nextNode + '-in')
          this.connectEndpoint(node.id + '-nomatch-out', node.data.nomatch.nextNode + '-in')
          var me = this
          node.data.choices.forEach( (item:any) =>{
            me.connectEndpoint(node.id + '-key-' + item.key + '-out', item.nextNode + '-in')
          })
        }
      
    
    

    // 放入拖动节点
    dropNode (template:any, position:any) {
        position.left -= $('#side-buttons').outerWidth()
        position.id =uuid.v1()
        position.generateId = uuid.v1
        console.log(template);
        var html = this.renderHtml(template, position)
        $(this.areaId).append(html) 
        this.initSetNode(template, position.id)
      }
    
      // 初始化节点设置
    initSetNode (template:any, id:any) {
        this.addDraggable(id)
    
        if (template === 'tpl-audio') {
            this.setEnterPoint(id)
            this.setExitPoint(id,null);//todo
        } else if (template === 'tpl-menu') {
            this.setEnterPoint(id + '-heading')
            this.setExitMenuItem(id)
        }
      }
    
      // 设置入口点
    setEnterPoint (id:any) {
        var config = this.getBaseNodeConfig()
        config.isSource = false
        config.maxConnections = -1
        jsPlumb.addEndpoint(id, {
          anchors: 'Top',
          uuid: id + '-in'
        }, config)
      }
    
      // 设置出口点
      setExitPoint (id:any, position:any) {
        var config = this.getBaseNodeConfig()
    
        config.isTarget = false
        config.maxConnections = 1
    
        jsPlumb.addEndpoint(id, {
          anchors: position || 'Bottom',
          uuid: id + '-out'
        }, config)
      }
    
    setExitMenuItem (id:any) {
        $('#' + id).find('li').each( (key:any, value:any) =>{
            key;
          this.setExitPoint(value.id, 'Right')
        })
      }
    
      // 删除一个节点以及
       emptyNode (id:any) {
        jsPlumb.remove(id)
      }
    
      // 让元素可拖动
    addDraggable (id:any) {
        jsPlumb.draggable(id, {
          containment: 'parent'
        });
      }
    
      // 渲染html
    renderHtml (type:any, position:any) {
        return Mustache.render(this.getTemplate(type), position)
      }
    
    eventHandler (data:any) {
        if (data.type === 'deleteNode') {
          this.emptyNode(data.id)
        }
      }

    
      // 链接建立后的检查
      // 当出现自连接的情况后，要将链接断开
    connectionBeforeDropCheck (info:any) {
        if (!info.connection.source.dataset.pid) {
          return true
        }
        return info.connection.source.dataset.pid !== info.connection.target.dataset.id
      }
    
      // 获取基本配置
    getBaseNodeConfig () {
        return Object.assign({}, this.visoConfig.baseStyle)
      }
    
      // 初始化开始节点属性
       initBeginNode (id:any) {
        var config = this.getBaseNodeConfig()
    
        config.isTarget = false
        config.maxConnections = 1
    
        jsPlumb.addEndpoint(id, {
          anchors: 'Bottom',
          uuid: id + '-out'
        }, config)
      }
    
      // 初始化结束节点属性
    initEndNode (id:any) {
        var config = this.getBaseNodeConfig();
        config.isSource = false
        jsPlumb.addEndpoint(id, {
          anchors: 'Top',
          uuid: id + '-in'
        }, config)
      }
    



}
//const anchors = [[1, 0.2, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0], [0.2, 0, 0, -1]];
