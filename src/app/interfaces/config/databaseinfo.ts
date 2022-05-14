
/**
 * 配置信息源接口--数据结构
 */
export interface DataBaseinfo {
    IP:string,
    Port:number,
    UserName:string,
    UserPwd:string,
    Base:string,
    Table:string,
    Kafka:{
      Topic:string,
      Url:string
    },
    HdfsUrl:string
}
  