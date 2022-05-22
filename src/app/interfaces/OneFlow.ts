import { dragbody } from "./public-api";

export class OneFlowchar{
    public dragbody_operation: dragbody[] = []; //⭐
    public dragbody_list:dragbody[]=[];          //⭐
    //存储连线的列表 只增加不删除就可以
    public linklist: any[] = [];                 //⭐
    //dragbody 的map 用uuid来标识
    public bodymap: Object={};        //⭐
    //TODO: 我要不要一个map来记录《uuid ,baseinfo?》？？？
    public bodybaseinfo : Object={};//⭐
    public opcodeinfo:  Object={};//⭐
}