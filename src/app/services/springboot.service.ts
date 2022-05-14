import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { catchError, map } from 'rxjs/operators';
import { JdbcConfig } from '../interfaces';
import { HttpParams } from '@angular/common/http';
import { Kafka } from '../interfaces/config/Kafka';
import { Hdfs } from '../interfaces/config/Hdfs';
import { Socket } from '../interfaces/config/Socket';
import { redis } from '../interfaces/config/redis';
// import { HttpClient } from '@angular/common/http';
// private httpClient: HttpClient
@Injectable({
  providedIn: 'root'
})
export class SpringbootService {
  private readonly BAS_URL: string = 'http://localhost:8081';
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
    URl:string,
    username:string,
    password:string,
    connectorType:string,
    driverClassName:string
  ): Observable<JdbcConfig>{
    const requestParam = { URl,username,password,connectorType,driverClassName};
    let params = new HttpParams();
    if (URl) {
      params = params.append('url', URl);
    }
    if (username) {
      params = params.append('username', username);
    }
    if (password) {
      params = params.append('password', password);
    }
    if (connectorType ) {
      params = params.append('connectorType', connectorType);
    }
    if (driverClassName) {
      params = params.append('driverClassName', driverClassName);
    }
    return this.httpClient.post<JdbcConfig>(this.BAS_URL+'/DataBase/insert',requestParam, { params });
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
    let params = new HttpParams();
    if (kafka.port) {
      params = params.append('DestPort', kafka.port);
    }
    if (kafka.topic) {
      params = params.append('Topic', kafka.topic);
    }
    if (kafka.url) {
      params = params.append('Ip', kafka.url);
    }
    return this.httpClient.post<Kafka>(this.BAS_URL+'/KafKA/insert',{ params });

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

    if (hdfs.url) {
      params = params.append('url', hdfs.url);
    }
    return this.httpClient.post<Hdfs>(this.BAS_URL+'/Hdfs/insert',{ params });

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

  if (socket.url) {
    params = params.append('url', socket.url);
  } 
  if (socket.port) {
    params = params.append('port', socket.port);
  }
  return this.httpClient.post<Socket>(this.BAS_URL+'/Socket/insert',{ params });

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
  let params = new HttpParams();
  if (redis.url) {
    params = params.append('url', redis.url);
  } 
  if (redis.Port) {
    params = params.append('port', redis.Port);
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
  return this.httpClient.post<redis>(this.BAS_URL+'/Redis/insert',{ params });

}
//#endregion
}



  
  
