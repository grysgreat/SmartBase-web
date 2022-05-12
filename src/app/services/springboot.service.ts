import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { catchError, map } from 'rxjs/operators';
import { JdbcConfig } from '../interfaces/jdbcconfig';
import { HttpParams } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
// private httpClient: HttpClient
@Injectable({
  providedIn: 'root'
})
export class SpringbootService {
  private readonly BAS_URL: string = 'http://localhost:8081';
  constructor(private readonly httpClient: HttpClient) { }
  
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
}



  
  
