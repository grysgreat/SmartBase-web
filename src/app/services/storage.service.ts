import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key:string,value:any){

    localStorage.setItem(key,JSON.stringify(value));
  }
  get(key:string){
    //新版本的Angular中注意判断 
    let tempStr=localStorage.getItem(key);
    if(tempStr){
      return JSON.parse(tempStr)
    }else{
      return null;
    }

  }
  remove(key:string){

    localStorage.removeItem(key);
  }

  


  write(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  // read(key: string): T {
  //   let value: string = localStorage.getItem(key);
  //   if (value && value != "undefined" && value != "null") {
  //       return <T>JSON.parse(value);
  //   }
  //   return null;
  // }




//对象转map
 objChangeMap = (obj:any) => {
  let map = new Map();
  for(let key in obj) {
     map.set(key,obj[key]);
  }
  return map;
}


//map转为json
 mapChangeObj = (map:any) => {
 let obj:any = {};
 for(let [k,v] of map) {
   obj[k] = v;
 }
 return obj;
}

}

