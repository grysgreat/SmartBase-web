import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AfterViewInit} from '@angular/core';
import { DropDataInterface } from 'interfaces';
@Component({
  selector: 'flink-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawAreaComponent implements OnInit,AfterViewInit  {

  componentList: { id: string, type: string }[] = [];
  ngOnInit(): void {
      this.componentList.push({
          id: Math.random().toString(),
          type: 'empty',
      });
  }

  ngAfterViewInit() {
  }

  constructor() { }
  getDropEvent(data: DropDataInterface) {
    // 首先根据id找到索引
    const idx = this.componentList.findIndex(item => item.id === data.currentAreaInfo.id);
    // 保证前后都有可插入区域
    this.componentList.splice(idx + 1, 0,
        {id:Math.random().toString(), type: data.component},
        {id:Math.random().toString(), type: 'empty'},
    );
}


}
