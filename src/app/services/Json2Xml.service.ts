import { Injectable } from "@angular/core";
import { json2xml } from "xml-js";
@Injectable({
    providedIn: 'root'
})
export class Json2XmlClass{
    dsf:string=`{\
        "userId": 1,\
        "id": 1,\
        "price": 1.1,\
        "title": "delectus aut autem",\
        "completed": false\
      }`;
    constructor() {}
    public converJson2Xml(json:string):string{
        return json2xml(json)
    }
}