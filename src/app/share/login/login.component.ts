import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpringbootService, StorageService } from 'services';
import { flinkUser } from 'interfaces';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'flink-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private readonly st:StorageService,
    private readonly sp:SpringbootService,
    private message: NzMessageService) {}
  public flag :boolean =false;
  public currentuser:flinkUser;
  private httpuser:Observable<flinkUser>;
  ngOnInit(): void {
    this.currentuser={
      id:0,
      name:"",
      pwd:"",
      priority:-1
    };

  }
  isVisible:boolean =false;

  handleCancel():void{
    this.isVisible=false;
  }
  handleOk():void{
    this.httpuser=this.sp.VarifyUserinfo(this.currentuser.name,this.currentuser.pwd);
    this.httpuser.subscribe({
      next: x=>{
          this.currentuser = x;
          this.st.set("user-info",JSON.stringify(this.currentuser));
          if(x.id!==-1){
            this.message.create('success', `Login in Success. Hello! ${this.currentuser.name}`);
            this.isVisible=false;
          }else{
            this.message.create('error', `Login in Fails. Please Check your account. `);
          }
        },
      error: ()=>  this.message.create('error', `Login Request Fail!`)
    }
     
    )
  }
  login():void{
    this.isVisible=true;
   
  }



}
