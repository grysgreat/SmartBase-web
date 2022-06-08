import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { catchError, map } from 'rxjs/operators';
import { JdbcConfig, jobidflow } from '../interfaces';
import { HttpParams } from '@angular/common/http';
import { Kafka } from '../interfaces/config/Kafka';
import { Hdfs } from '../interfaces/config/Hdfs';
import { Socket } from '../interfaces/config/Socket';
import { redis } from '../interfaces/config/redis';
import { Table } from '../interfaces';
// import { HttpClient } from '@angular/common/http';
// private httpClient: HttpClient
@Injectable({
  providedIn: 'root'
})
export class SpringbootService {
  private readonly BAS_URL: string = 'http://localhost:8082';
  constructor(private readonly httpClient: HttpClient) { }

//#region ---------------------- JDBC ----------------------
  public SearchAllJdbc(): Observable<JdbcConfig[]>{
      return this.httpClient.get<JdbcConfig[]>( this.BAS_URL+'/DataBase/FindALLDataBaseConfigs');
  }
  //删除指定配置
  public deleteJdncConfig(index:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.BAS_URL}/DataBase/Delete/${index}`);
  }
  // 创建新的jdbc配置
  public newJdbcConfig(
    jdbc:JdbcConfig
  ): Observable<JdbcConfig>{
    const requestParam = { jdbc};
    let params = new HttpParams();
    if (jdbc.url) {
      params = params.append('url', jdbc.url);
    }
    if (jdbc.port) {
      params = params.append('port', jdbc.port);
    }
    if(jdbc.connectorType){
      params = params.append('connectorType', jdbc.connectorType);
    }
    if (jdbc.username) {
      params = params.append('username', jdbc.username);
    }
    if (jdbc.password) {
      params = params.append('password', jdbc.password);
    }
    if(jdbc.tablename){
      params = params.append('tablename', jdbc.tablename);
    }
    if(jdbc.basename){
      params = params.append('basename', jdbc.basename);
    }
    if (jdbc.driveClassName) {
      params = params.append('driverClassName', jdbc.driveClassName);
    }
    return this.httpClient.post<JdbcConfig>(this.BAS_URL+'/DataBase/insert',requestParam, { params });
  }
  //更新jdbc
  public updateJdbcConfig(  jdbc:JdbcConfig): Observable<JdbcConfig>{
    const requestParam = { jdbc};
    let params = new HttpParams();
    if (jdbc.id) {
      params = params.append('id', jdbc.id);
    }
    if (jdbc.url) {
      params = params.append('url', jdbc.url);
    }
    if (jdbc.port) {
      params = params.append('port', jdbc.port);
    }
    if(jdbc.connectorType){
      params = params.append('connectorType', jdbc.connectorType);
    }
    if (jdbc.username) {
      params = params.append('username', jdbc.username);
    }
    if (jdbc.password) {
      params = params.append('password', jdbc.password);
    }
    if(jdbc.tablename){
      params = params.append('tablename', jdbc.tablename);
    }
    if(jdbc.basename){
      params = params.append('basename', jdbc.basename);
    }
    if (jdbc.driveClassName) {
      params = params.append('driverClassName', jdbc.driveClassName);
    }
    return this.httpClient.post<JdbcConfig>(this.BAS_URL+'/DataBase/update',requestParam, { params });
  }
//#endregion

//#region  Kafka 
//---------------------- Kafka ----------------------
// 查删增加
  public ShowallKafka():Observable<Kafka[]>{
    return this.httpClient.get<Kafka[]>( this.BAS_URL+'/KafKA/FindAllKafKAConfigs');
  }
  public deleteKafkaConfig(index:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.BAS_URL}/KafKA/DeleteKafKAConfigByid/${index}`);
  }
  public newKafka(kafka:Kafka): Observable<Kafka>{
    const requestParam = { kafka};
    let params = new HttpParams();
    if (kafka.port) {
      params = params.append('port', kafka.port);
    }
    if (kafka.topic) {
      params = params.append('Topic', kafka.topic);
    }
    if (kafka.url) {
      params = params.append('Url', kafka.url);
    }
    return this.httpClient.post<Kafka>(this.BAS_URL+'/KafKA/Insert',requestParam,{ params });

  }

  public updateKafka(kafka:Kafka): Observable<Kafka>{
    const requestParam = { kafka};
    let params = new HttpParams();
    if (kafka.id) {
      params = params.append('id', kafka.id);
    }
    if (kafka.port) {
      params = params.append('port', kafka.port);
    }
    if (kafka.topic) {
      params = params.append('Topic', kafka.topic);
    }
    if (kafka.url) {
      params = params.append('Url', kafka.url);
    }
    return this.httpClient.post<Kafka>(this.BAS_URL+'/KafKA/update',requestParam,{ params });

  }
//#endregion

//#region  Hdfs
//---------------------- Hdfs ----------------------
  public showAllHdfs(): Observable<Hdfs[]>{
    return this.httpClient.get<Hdfs[]>( this.BAS_URL+'/Hdfs/FindAllHdfsConfig');
  }
  public deleteHDFS(index:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.BAS_URL}/Hdfs/DeleteHdfsConfigByid/${index}`);
  }
  public newHdfs(hdfs:Hdfs): Observable<Hdfs>{
    let params = new HttpParams();
    const requestParam = { hdfs};
    if (hdfs.url) {
      params = params.append('url', hdfs.url);
    }
    if (hdfs.type) {
      params = params.append('type', hdfs.type);
    }
    return this.httpClient.post<Hdfs>(this.BAS_URL+'/Hdfs/insert',requestParam,{ params });

  }
  public updateHdfs(hdfs:Hdfs): Observable<Hdfs>{
    let params = new HttpParams();
    const requestParam = {hdfs};
    if(hdfs.id){
      params = params.append('id', hdfs.id);
    }
    if (hdfs.url) {
      params = params.append('url', hdfs.url);
    }
    if (hdfs.type) {
      params = params.append('type', hdfs.type);
    }
    return this.httpClient.post<Hdfs>(this.BAS_URL+'/Hdfs/update',requestParam,{ params });

  }
//#endregion

//#region Socket ----------------------
public showAllSocket(): Observable<Socket[]>{
  return this.httpClient.get<Socket[]>( this.BAS_URL+'/Socket/FindAllSocket');
}
public deleteSocket(index:number):Observable<boolean>{
  return this.httpClient.get<boolean>(`${this.BAS_URL}/Socket/DeleteSocketByid/${index}`);
}
public newSocket(socket:Socket): Observable<Socket>{
  let params = new HttpParams();
  const requestParam = { socket};
  if (socket.url) {
    params = params.append('url', socket.url);
  } 
  if (socket.port) {
    params = params.append('port', socket.port);
  }
  return this.httpClient.post<Socket>(this.BAS_URL+'/Socket/insert',requestParam,{ params });

}
public updateSocket(socket:Socket): Observable<Socket>{
  let params = new HttpParams();
  const requestParam = { socket};
  if (socket.id) {
    params = params.append('id', socket.url);
  } 
  if (socket.url) {
    params = params.append('url', socket.url);
  } 
  if (socket.port) {
    params = params.append('port', socket.port);
  }
  return this.httpClient.post<Socket>(this.BAS_URL+'/Socket/update',requestParam,{ params });

}
//#endregion

//#region Redis 
public showAllRedis(): Observable<redis[]>{
  return this.httpClient.get<redis[]>( this.BAS_URL+'/Redis/FindAllRedisConfigs');
}
public deleteRedis(index:number):Observable<boolean>{
  return this.httpClient.get<boolean>(`${this.BAS_URL}/Redis/DeleteRedisConfigByid/${index}`);
}
public newRedis(redis:redis): Observable<redis>{
  const requestParam = { redis};
  let params = new HttpParams();
  if (redis.url) {
    params = params.append('url', redis.url);
  } 
  if (redis.port) {
    params = params.append('port', redis.port);
  }
  if(redis.username) {
    params = params.append('username', redis.username);
  }
  if(redis.password) {
    params = params.append('password', redis.password);
  }
  if(redis.tablename){
    params = params.append('tablename', redis.tablename);
  }
  return this.httpClient.post<redis>(this.BAS_URL+'/Redis/insert',requestParam,{ params });

}

public updateRedis(redis:redis): Observable<redis>{
  const requestParam = {redis};
  let params = new HttpParams();
  if (redis.id) {
    params = params.append('id', redis.id);
  }
  if (redis.url) {
    params = params.append('url', redis.url);
  } 
  if (redis.port) {
    params = params.append('port', redis.port);
  }
  if(redis.username) {
    params = params.append('username', redis.username);
  }
  if(redis.password) {
    params = params.append('password', redis.password);
  }
  if(redis.tablename){
    params = params.append('tablename', redis.tablename);
  }
  return this.httpClient.post<redis>(this.BAS_URL+'/Redis/update',requestParam,{ params });

}
//#endregion







//#region 流程图数据支持
public showAllJobs(): Observable<jobidflow[]>{
  return this.httpClient.get<jobidflow[]>( this.BAS_URL+'/jobflow/showall');
}

public InsertJobs(jb:jobidflow):Observable<jobidflow>{
  const requestParam = { jb};
  let params = new HttpParams();
  if (jb.jobid) {
    params = params.append('jobid', jb.jobid);
  } 
  if (jb.jsondata) {
    params = params.append('jsondata', jb.jsondata);
  }

  return this.httpClient.post<jobidflow>(this.BAS_URL+'/jobflow/insert',requestParam,{ params });

}
//#endregion


//#region 动态生成Java Class
public GetJavaClassBySQl(index:number):Observable<Table>{
  return this.httpClient.get<Table>(`${this.BAS_URL}/dbtoclass/ChangeToTable/${index}`);
}

public Json2JavaClass(jsonclass:string):Observable<Table>{
  let params = new HttpParams();
  params = params.append("metajson",jsonclass)
  return this.httpClient.post<Table>(this.BAS_URL+"/dbtoclass/jsontoclass",{"metajson":jsonclass},{ params });
}

//#endregion
}



  
  
