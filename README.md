# Angular Filnk前端项目

本项目是Apache/Flink 中前端项目的二开
主要用于支持软工课设FLink多元异构数据处理平台SmartBase项目的前端驱动
[Flink多元异构](https://gitee.com/StarGrys/smart-base) 



*--------------developing-------------*
----

去到对应文件夹
创建新模块  ng g m （） --routing  
创建新模块的静态文件 ng g c （）

关于icon图标的使用 需要查找同名暴漏类并引入 
如database对应DataBase

```typescript
import {
  DatabaseOutline
  ,...
} from '@ant-design/icons-angular/icons';
```

### 隐藏bug 
关于Cancel job小按钮 在添加一些小的其他功能后出现了消失的情况 ，但更改下业务逻辑后得到改善 但只是权衡之计 可以在做完后再研究一下
//但屈指西风几时来，又不道流年暗中偷换。 --洞仙歌·冰肌玉骨

## 关于流程图

  流程图采用了jsplumb库，在ts库中

使用该库时候 应该通过`angular.json`文件中因为js文件，然后在对应的ts文件中

```tsx
declare let jsPlumb: any;
```

即可

同时需要依靠原生jQuery来进行相应的事件绑定

那么现在的问题是动态组件的数据绑定问题



#### 解决的问题一：close

jsPlumb库的使用问题。需要密切关注组件的生命周期问题，因为没有采用ts库中面向对象的方法，而是利用js 的全局变量，所以需要自己关注组件加载期间函数的使用过程。

如遇到的bug，在对组件进行可拖拽函数处理时 ：draggable（） 

需要等待组件加载view之后进行该过程。 所以应在拖拽子组件的周期hook：ngAfterViewInit（）中进行相应操作。

#### 解决的问题二：running

##### 在画板组件中的数据结构

```typescript
  //接收所有信息源数据的list
  public ****llist: Socket[];
  // 所有类型的dragbody 主要用于通过*ngFor来渲染页面
`全部加入到画板内的组件都会放入该list`
  public dragbody_****: dragbody[] = [];
  //存储连线的列表 只增加不删除就可以
`存储连线连线。包含sourceId 与 targetId`
  public linklist: any[] = [];
  //dragbody 的map 用uuid来标识
`换个方式存储dragbody 的目的是更好通过uuid 就能拿到对应的dragbody`
  public bodymap: Map<string, dragbody>;
  //#region 以下数据结构只在用到的时候更新
      //记录所有的头节点
  `多次dfs 以便提取出所有的工作流`
      public sourcelist: dragbody[] = []; 
      //图结构
`string：父组件的uuid  => string[] 连接的所有子组件uuid`
      public bodyGraph: Map<string, string[]>;
      //存储计算好的数据流
      public joblist: dragbody[][] = [[]];
  //#endregion
```

数据有一定冗余 但权衡不同组件的差异性后，还是保留这种冗余

后面会再次讨论多种数据源组件的差异性问题

##### 在展示子组件中的数据结构

```typescript
  @Input() data:dragbody; `组件基本信息`
  @Input() configlist:Baseinfo[]; `所有对应组件的信息源配置信息 方便通过select box 的方式进行选择`
  @Output() close=new EventEmitter<string>(); `删除组件的emit`
  types:string|undefined=""; //组件的type 如jdbc/redis等
  localdatat:Baseinfo;`当前展示的配置信息`
```



# 部署
<base href="./"/> 需要更改

//TODO
1. jdbc 数据源管理 修改部分