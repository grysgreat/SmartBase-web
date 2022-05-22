import { JdbcConfig } from "../config/jdbcconfig";
import {Hdfs} from "../config/Hdfs";
import {Kafka} from "../config/Kafka";
import {redis} from "../config/redis";
import {Socket} from "../config/Socket";
import { drageumn } from "./drageumn";
//拖动窗口的传入信息
export interface Draginfo{
    types:"reids"|"JDBC"|"Kafka"|"Hdfs"|"Socket";
 
}
export interface testinfo extends Draginfo,drageumn
{}

export interface Baseinfo extends JdbcConfig,Kafka,redis,Hdfs,Socket
{}
// export class BaseInfo implements JdbcConfig, Hdfs , Kafka, redis ,Socket ,drageumn{
// }
