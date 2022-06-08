import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { field, Table } from 'interfaces';
import { SpringbootService } from 'services';

@Component({
  selector: 'flink-dynamic-class',
  templateUrl: './dynamic-class.component.html',
  styleUrls: ['./dynamic-class.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicClassComponent implements OnInit {

  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  fieldlist :field[]=[];
  Tablename:string="";
  convertTable:Table;

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    var fielda:field={
      name:"",
      typeName:"",
      type:0,
      pk:false
    }
    this.fieldlist.push(fielda);

  }

  removeField(i:number, e: MouseEvent): void {
    e.preventDefault();
    this.fieldlist.splice(i,1);
  }

  submitForm(): void {
      console.log('submit',JSON.stringify(this.fieldlist) );

      let table :Table={
        name:this.Tablename,
        javaContext:"",
        count:0,
        column:this.fieldlist
      }
      this.sp.Json2JavaClass(JSON.stringify(table)).subscribe(x=>{
        this.convertTable=x;
        console.log(x.javaContext);
      })
      
  }

  constructor(private fb: FormBuilder,
    private sp:SpringbootService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
  }
}
