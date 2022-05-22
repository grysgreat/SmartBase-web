import { Baseinfo } from "./public-api";
import { opcode } from "./public-api";

/**
 * @param source 源数据源
 * @param target 目标数据源
 * @param opeartionlist 中间算子列表
 */
export class JobDataFlow{

    source:Baseinfo;
    operators :opcode[]=[];
    dest:Baseinfo;
    constructor(){
    }

}