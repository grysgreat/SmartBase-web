//import { Draginfo } from "./public-api";
import { Baseinfo } from "./public-api";
export interface dragbody{
    id :string;
    name :string;
    top:number;
    left:number;
    opcode:string;
    sourcedata? :Baseinfo;//可选选项
}