import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
declare let jsPlumb: any;
declare let $: any;
import * as d3 from 'd3';
import { DndDropEvent } from 'ngx-drag-drop';
import { Observable } from 'rxjs';
import { Tools } from 'interfaces';
import { NzModalRef } from 'ng-zorro-antd/modal';
// import { NodeInputfileComponent } from '../node-inputfile';
// import { NodeParamsetComponent } from '../node-paramset';
// import { NodeSelectfileComponent } from '../node-selectfile';

@Component({
  selector: 'flink-data-flow',
  templateUrl: './data-flow.component.html',
  styleUrls: ['./data-flow.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataFlowComponent implements OnInit {


    tplModal: NzModalRef;
    code = 0;
    active = 0;
    tools$: Tools[];
    tool$: Observable<Tools>;
    offx = 0;
    offy = 0;
    lastDropEvent: DndDropEvent[] = [];
    currentNodeData:any;
    instance:any;

    constructor( ) {

    }

    getTools = (type: number) => {
        this.tools$ = [{  id: type,name: "tset1",version: "string"},
        {  id: type+2,name: "tset1",version: "string"}]
        this.active = type;
    }

    ngOnInit() {
        this.getTools(this.active);
        jsPlumb.ready( () =>{
            let color = "#5b5a57";
            this.instance = jsPlumb.getInstance({
                Connector: ["Bezier", { curviness: 50 }],
                DragOptions: { cursor: "pointer", zIndex: 2000 },
                PaintStyle: {
                    strokeStyle: color, lineWidth: 3
                },
                Overlays: [["PlainArrow", { location: 1, width: 12, length: 12 }]],
                Endpoint: ["Dot", { radius: 5 }],
                EndpointStyle: { fillStyle: "#567567" },
                HoverPaintStyle: { strokeStyle: "#7073EB" },
                EndpointHoverStyle: { fillStyle: "#7073EB" },
                Container: "flow-panel",
                ConnectionOverlays: [["Custom", {
                    create: function (component:any) {
                      console.log(component);
                        return $("<button title='选择输入文件'><i class='anticon anticon-select'></i></button>");
                    },
                    location: 0.5,
                    events: {
                        click:  (Overlay:any, originalEvent:any)=> {
                          console.log(originalEvent);
                            this.selectInputfileModal(Overlay.component.sourceId, Overlay.component.sourceId.split('-')[1]);
                        }
                    }
                }]]
            });
            this.instance.bind("connection", function (connInfo:any, originalEvent:any) {
              console.log(connInfo);
              console.log(originalEvent);
                // that.http.post('/tool/check', { sourcenode: connInfo.connection.sourceId.split('-')[1], targetnode: connInfo.connection.targetId.split('-')[1] }).subscribe(res => {
                //     if (!res) {
                //         that.msg.error('输出的文件格式与目标工具的输入格式不搭配，请重新选择！', { nzDuration: 3000 });
                //         jsPlumb.detach(connInfo.connection);
                //     }
                // });
            });
            $('#flow-panel').on('drop',  (ev:any)=> {
                if (ev.target.className.indexOf('_jsPlumb') >= 0) {
                    return;
                }
                ev.preventDefault();
                let mx = '' + (ev.originalEvent.offsetX - this.offx) + 'px';
                let my = '' + (ev.originalEvent.offsetY - this.offy) + 'px';
                console.log(this.currentNodeData);
                let node = this.addNode(this.instance, this.code + "-" + this.currentNodeData.id, this.currentNodeData, { x: mx, y: my });
                this.addPorts(this.instance, node, ["Top", "Bottom", "Left", "Right"]);
                this.instance.draggable($(node), {
                    containment: 'parent'
                });
                this.code++;
            }).on('dragover', function (ev:any) {
                console.log('on drag over'+ev.toString());
            });


            jsPlumb.fire("jsFlowLoaded", this.instance);
            this.instance.bind('dblclick', function (conn:any) {
                jsPlumb.detach(conn)
            })
        })
    }

    addNode(instance:any, nodeId:any, data:any, position:any) {
        let panel = d3.select("#flow-panel");
        panel.append('div')
            .style('position', 'absolute')
            .style('top', position.y).style('left', position.x)
            .style('width', ' 200px').style('background-color', 'white')
            .style('border-radius', '8px')
            .attr('id', nodeId).classed('node', true);
        $('#' + nodeId).hover( () => {
            $(this).removeClass("outhover").addClass("inhover");
        }, () => {
            $(this).removeClass("inhover").addClass("outhover");
        })

        /* <div id='" + nodeId + "-selectfile' title='详情'><i class='anticon anticon-profile'></i></div> */

        $('#' + nodeId).append($("<div class='huangcard'><div class='zuo'><div class='title'><strong>" + data.name + "</strong></div><div class='card-content'><i class='anticon anticon-user'></i><span class='mes'>" + data.id + "黄小民</span></div><div class='card-content'><i class='anticon anticon-message'></i><span class='mes'>低质量数据过滤</span></div><div class='card-content'><i class='anticon anticon-clock-circle-o'></i><span class='mes'>执行时间：20min20s</span></div></div><div class='you'><div id='" + nodeId + "-setting' title='参数设置'><i class='anticon anticon-setting'></i></div><div id='" + nodeId + "-inputFile' title='上传文件'><i class='anticon anticon-file-add'></i></div><div id='" + nodeId + "-delete' title='删除'><i class='anticon anticon-delete'></i></div></div></div>"));
        /* data.inputFile ? $('#' + nodeId + '-setting').hide() : $('#' + nodeId + '-inputFile').hide(); */
        $('#' + nodeId + '-delete').click(() =>{
            instance.detachAllConnections(nodeId);
            instance.deleteEndpoint(nodeId + "-Top");
            instance.deleteEndpoint(nodeId + "-Bottom");
            instance.deleteEndpoint(nodeId + "-Left");
            instance.deleteEndpoint(nodeId + "-Right");
            instance.remove(nodeId);
        })
        $('#' + nodeId + '-inputFile').click(() =>{
            this.createInputfileModal(nodeId.split('-')[1]);
        })
        $('#' + nodeId + '-setting').click(() =>{
          this.createSettingModal(nodeId.split('-')[1]);
        })
        return jsPlumb.getSelector('#' + nodeId)[0];
    }

    selectInputfileModal(nodeId:any, toolId:any) {
        console.log("输入文件选择" + nodeId + 'tool' + toolId)
    
    }

    createInputfileModal(toolId:any): void {
      console.log(toolId);
    }
        // this.modalService.create({
        //     nzTitle: '原始数据上传',
        //     nzContent: NodeInputfileComponent,
        //     nzComponentParams: {
        //         projectId: 'jiance1',
        //         toolId: toolId
        //     },
        //     nzMaskClosable: false,
        //     nzFooter: null,
  
    

    createSettingModal(toolId:any): void {
        console.log(toolId);
        /* this.modalService.create({
            nzTitle: '参数设置',
            nzContent: NodeParamsetComponent,
            nzComponentParams: {
                projectId: 'ceshicanshu1',
                toolId: toolId
            },
            nzMaskClosable: false,
            nzFooter: null,
        }); */
     
    }

    addPorts(instance:any, node:any, ports:any) {
        for (let i = 0; i < ports.length; i++) {
            let paintStyle = { radius: 5, fillStyle: '#D4FFD6' };
            instance.addEndpoint(node, {
                uuid: node.getAttribute("id") + "-" + ports[i],
                paintStyle: paintStyle,
                anchor: ports[i],
                maxConnections: -1,
                isSource: true,
                isTarget: true
            });
        }
    }

    onDragStart(event: DragEvent) {
        this.offx = event.offsetX;
        this.offy = event.offsetY;
    }

    onDragEnd(event: DragEvent) {console.log(event);
    }

    onDraggableCopied(event: DragEvent) {console.log(event);
    }

    onDraggableLinked(event: DragEvent) {console.log(event);
    }

    onDraggableMoved(event: DragEvent) {console.log(event);
    }

    onDragCanceled(event: DragEvent) {
      console.log(event);
    }

    onDragover(event: DndDropEvent) {
      console.log(event.data);
    }

    onDrop(event: DndDropEvent) {
        this.lastDropEvent.push(event);
        this.currentNodeData = event.data;
        console.log(event.data)
    }

    baocun() {
    }

    jiazai() {
        
    }
}

