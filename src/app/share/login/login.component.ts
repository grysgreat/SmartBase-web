import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from 'services';
import { flinkUser } from 'interfaces';
@Component({
  selector: 'flink-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private readonly st:StorageService) {}
  public tset:number =2;
  public currentuser:flinkUser;
  ngOnInit(): void {
    this.currentuser={
      id :0,
      name: "",
      pwd:"",
      priority:-1
    };

  }
  isVisible:boolean =false;

  handleCancel():void{
    this.isVisible=false;
  }
  handleOk():void{
    this.st.set("user-info",this.currentuser);
    console.log(this.currentuser);
  }
  login():void{
    this.isVisible=true;
   
  }



}
