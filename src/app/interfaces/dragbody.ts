//import { Draginfo } from "./public-api";

/**
 * @var id : 唯一随机uuid
 * @var name : 暂时没用
 * @var top : 位置信息 
 * @var left: 位置信息
 * @var opcode: target/source/operation
 */
export class dragbody{
    id :string;//唯一随机uuid
    name :string;//暂时没用
    top:number;// 
    left:number;
    opcode:string;
    sourcetype:string;


    // constructor(id :string,name :string,top:number,left:number,opcode:string) { 
    //     this.id=id;
    //     this.name=name;
    //     this.top=top;
    //     this.left=left;
    //     this.opcode=opcode;
    // }
    constructor(){}

    cloneD():dragbody {
        let temp = new dragbody();
        temp.id = this.id;
        temp.name = this.name;
        temp.top = this.top;
        temp.opcode = this.opcode;
        temp.sourcetype  = this.sourcetype;
        return temp;
    }
    // clone():dragbody{
    //     let temp = new dragbody();
    //     temp.id = this.id;
    //     return temp;
    // }
}

