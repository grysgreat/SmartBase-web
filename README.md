# Angular Filnk前端项目

本项目是Apache/Flink 中前端项目的二开
主要用于支持软工课设FLink多元异构数据处理平台SmartBase项目的前端驱动
[Flink多元异构](https://gitee.com/StarGrys/smart-base) 
目前闭源，可能在答辩后开源



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
1. 关于Cancel job小按钮 在添加一些小的其他功能后出现了消失的情况 ，但更改下业务逻辑后得到改善 但只是权衡之计 可以在做完后再研究一下
//但屈指西风几时来，又不道流年暗中偷换。 --洞仙歌·冰肌玉骨