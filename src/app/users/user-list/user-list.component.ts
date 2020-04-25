import { Component, OnInit ,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {UserService} from'../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  modalRef: BsModalRef;
  user: User= new User();
  users:any;
  errorMsg: ErrorMsg = new ErrorMsg();
  constructor(private modalService: BsModalService, private UserService:UserService) {}
 


  ngOnInit(): void {
  
this.getUser();
}

  getUser(){

    this.UserService.get().subscribe(res=>{
      this.users=res;
      console.log(this.users);
    },error =>{
      console.log(error)
    
    })
  }

onSave(){
this.errorMsg.name=this.errorMsg.suggestion='';
!this.user.name ? this.errorMsg.name = 'Name required':'';
!this.user.name ? this.errorMsg.suggestion = 'Suggestion required':'';

if(!this.user.name || !this.user.suggestion){
  return;
}
 this.UserService.post(this.user).subscribe(res=>{
   this.getUser();
   this. modalRef.hide();
   console.log(res)
 }, error =>{
   console.log(error);
 

 });
}

  openModalAdd(add: TemplateRef<any>) {
    this.modalRef = this.modalService.show(add);

}
}
class User{
  name:String;
  suggestion: string;

}
class ErrorMsg{
  name:String;
  suggestion: string;
  
}