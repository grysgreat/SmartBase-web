import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { catchError, map } from 'rxjs/operators';
import { flinkUser, JdbcConfig, jobidflow, modbus, opcua } from '../interfaces';
import { HttpParams } from '@angular/common/http';
import { Kafka } from '../interfaces/config/Kafka';
import { Hdfs } from '../interfaces/config/Hdfs';
import { Socket } from '../interfaces/config/Socket';
import { redis } from '../interfaces/config/redis';
import { Table } from '../interfaces';
import { StorageService } from './storage.service';
import { rtmprtsp } from '../interfaces/config/rtmprtsp';
// import { HttpClient } from '@angular/common/http';
// private httpClient: HttpClient
@Injectable({
  providedIn: 'root'
})
export class SpringbootService {
  private readonly BAS_URL: string = 'http://localhost:8082';
  constructor(private readonly httpClient: HttpClient,private readonly st:StorageService) { }

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

//#region Rtmp & Rtsp
public showRtsp(): Observable<rtmprtsp[]>{
  return this.httpClient.get<rtmprtsp[]>( this.BAS_URL+'/rtsp/all');
}
public deleteRtsp(index:number):Observable<boolean>{
  return this.httpClient.get<boolean>(`${this.BAS_URL}/rtsp/delete/${index}`);
}
public newRtsp(hdfs:rtmprtsp): Observable<boolean>{
  let params = new HttpParams();
  const requestParam = { hdfs};
  if (hdfs.url) {
    params = params.append('url', hdfs.url);
  }
  return this.httpClient.post<boolean>(this.BAS_URL+'/rtsp/insert',requestParam,{ params });

}
public updateRtsp(rtmp:rtmprtsp): Observable<rtmprtsp>{
  let params = new HttpParams();
  const requestParam = {rtmp};
  if(rtmp.id){
    params = params.append('id', rtmp.id);
  }
  if (rtmp.url) {
    params = params.append('url', rtmp.url);
  }
  return this.httpClient.post<rtmprtsp>(this.BAS_URL+'/rtsp/update',requestParam,{ params });

}
/////////////////////////

public showRtmp(): Observable<rtmprtsp[]>{
  return this.httpClient.get<rtmprtsp[]>( this.BAS_URL+'/rtmp/all');
}
public deleteRtmp(index:number):Observable<boolean>{
  return this.httpClient.get<boolean>(`${this.BAS_URL}/rtmp/delete/${index}`);
}
public newRtmp(hdfs:rtmprtsp): Observable<boolean>{
  let params = new HttpParams();
  const requestParam = { hdfs};
  if (hdfs.url) {
    params = params.append('url', hdfs.url);
  }
  return this.httpClient.post<boolean>(this.BAS_URL+'/rtmp/insert',requestParam,{ params });

}
public updateRtmp(rtmp:rtmprtsp): Observable<rtmprtsp>{
  let params = new HttpParams();
  const requestParam = {rtmp};
  if(rtmp.id){
    params = params.append('id', rtmp.id);
  }
  if (rtmp.url) {
    params = params.append('url', rtmp.url);
  }
  return this.httpClient.post<rtmprtsp>(this.BAS_URL+'/rtmp/update',requestParam,{ params });

}




//#endregion

//#region Modbus
public showAllModbus(): Observable<modbus[]>{
  return this.httpClient.get<modbus[]>( this.BAS_URL+'/modbus/all');
}
public deleteModbus(index:number):Observable<boolean>{
  return this.httpClient.get<boolean>(`${this.BAS_URL}/modbus/delete/${index}`);
}
public newModbus(item:modbus): Observable<boolean>{
  let params = new HttpParams();
  const requestParam = { item};
  if (item.url) {
    params = params.append('url', item.url);
  } 
  if (item.port) {
    params = params.append('port', item.port);
  }
  if (item.data) {
    params = params.append('data',item.data);
  }
  return this.httpClient.post<boolean>(this.BAS_URL+'/modbus/insert',requestParam,{ params });

}


//#endregion


//#region    OPC UA

public showAllOPCUA(): Observable<opcua[]>{
  return this.httpClient.get<modbus[]>( this.BAS_URL+'/OpcUa/all');
}
public deleteOPCUA(index:number):Observable<boolean>{
  return this.httpClient.get<boolean>(`${this.BAS_URL}/OpcUa/delete/${index}`);
}
public newOPCUA(item:opcua): Observable<boolean>{
  let params = new HttpParams();
  const requestParam = { item};
  if (item.ServerUrl) {
    params = params.append('serverUrl', item.ServerUrl);
  } 
  if (item.userName) {
    params = params.append('userName', item.userName);
  }
  if (item.password) {
    params = params.append('password',item.password);
  }
  if (item.inAnonymous) {
    params = params.append('isAnonymous',item.inAnonymous);
  }
  if (item.identifier) {
    params = params.append('identifier',item.identifier);
  }
  return this.httpClient.post<boolean>(this.BAS_URL+'/OpcUa/insert',requestParam,{ params });

}
//#endregion

//#region 用户登录与相关信息
public VarifyUserinfo(name:string,pwd :string ):Observable<flinkUser>{
  let params = new HttpParams();
  if (name) {
    params = params.append('name', name);
  } 
  if(pwd){
    params = params.append('pwd',pwd);
  }
  let postparater = {
    "name":name,
    "pwd":pwd
  }
  return this.httpClient.post<flinkUser>(this.BAS_URL+'/UserConfig/login',postparater,{ params });
}

public ShowAllUser():Observable<flinkUser[]>{
  return this.httpClient.get<flinkUser[]>(this.BAS_URL+'/UserConfig/listAllUser');
}

public AddUserid(jobid:string):Observable<boolean>
{
  let user:flinkUser;
    if(this.st.get("user-info")!=null){
      console.log(this.st.get("user-info"));
      
      user=JSON.parse(this.st.get("user-info"));
    }else{
      user={
        id:-1,
        name:"",
        pwd:"",
        priority:-1
      }
    }
  let params = new HttpParams();
  if (jobid) {
    params = params.append('jobid', jobid);
  } 
  params = params.append('userid', user.id);


  return this.httpClient.post<boolean>(this.BAS_URL+'/UserJobConfig/addjobid',null,{ params });
}

public findjobsuser(jobid:string):Observable<number>{
  let params = new HttpParams();
  if (jobid) {
    params = params.append('jobid', jobid);
  } 
  return this.httpClient.post<number>(this.BAS_URL+'/UserJobConfig/userid',null,{ params });
}

public findjobsuserName(jobid:string):Observable<string>{

  return this.httpClient.get(`${this.BAS_URL}/UserJobConfig/jobUsername?jobid=${jobid}`,{
    responseType: 'text',
  });
}

public newFlinkUser(item:flinkUser): Observable<boolean>{
  let params = new HttpParams();
  const requestParam = { item};
  if (item.name) {
    params = params.append('name', item.name);
  } 

  if (item.pwd) {
    params = params.append('pwd',item.pwd);
  }
  if(item.priority){
    params = params.append('priority',item.priority);
  }
  return this.httpClient.post<boolean>(this.BAS_URL+'/UserConfig/insertUser',requestParam,{ params });

}

public deleteFlinkUser(index:number):Observable<boolean>{
  return this.httpClient.get<boolean>(`${this.BAS_URL}/UserConfig/delete/${index}`);
}
//#endregion



//#region 流程图数据支持
public showAllJobs(): Observable<jobidflow[]>{
  return this.httpClient.get<jobidflow[]>( this.BAS_URL+'/jobflow/showall');
}

public showJobbyID(jid:string):Observable<jobidflow>{
  return this.httpClient.get<jobidflow>(`${this.BAS_URL}/jobflow/lookfor/${jid}`);
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
  if(jb.jobjson){
    params = params.append('jobjson', jb.jsondata);
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



  
  
